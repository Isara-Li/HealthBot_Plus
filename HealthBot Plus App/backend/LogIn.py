from flask import jsonify, request, make_response
from datetime import datetime, timedelta
import bcrypt
import jwt  # Import JWT for token creation
from bson import ObjectId

SECRET_KEY = 'Isara'

def LogIn(request, db):
    user_input = request.json
    collection = db['user']

    # Check if a user with the same email exists
    existing_user = collection.find_one({"email": user_input['email']})

    if existing_user is None:
        return jsonify({"status": "error", "message": "No user found"}), 400

    # Hash the password provided in the request and compare with the stored hash
    password_plain = user_input['password'].encode('utf-8')
    stored_hashed_password = existing_user['password']

    if not bcrypt.checkpw(password_plain, stored_hashed_password):
        return jsonify({"status_login": "error", "message": "Invalid password"}), 401

    # Convert ObjectId to string before returning the response
    existing_user['_id'] = str(existing_user['_id'])

    # Generate a JWT token with the user's ID
    token_data = {
        "user_id": str(existing_user['_id']),
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    
    # Use PyJWT to encode the token
    token = jwt.encode(token_data, SECRET_KEY, algorithm='HS256')

    response = make_response(jsonify({"status": "Ok", "message": "User successfully logged in"}))
    response.set_cookie('auth_token', token, httponly=True, secure=True, samesite='Strict')
    
    # Remove the password for security
    del existing_user['password']  

    # Convert remaining ObjectIds to strings if needed before adding to cookie
    response.set_cookie('user_data', jsonify(existing_user).data.decode('utf-8'), httponly=False, secure=True)

    return response

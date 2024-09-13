from flask import jsonify, request, make_response
from datetime import datetime, timedelta  # Import datetime and timedelta correctly
import bcrypt
import jwt  # Import JWT for token creation
from bson import ObjectId
import os  # To use environment variables

SECRET_KEY = 'Isara'  # Hardcoded secret (you might want to use environment variables instead)

def LogIn(request, db):
    collection = db['user']

    data = request.get_json()  # Extract email and password from request body
    email = data.get('email')
    password = data.get('password')

    # Find the user by email in MongoDB
    valid_user = collection.find_one({'email': email})

    if not valid_user:
        return jsonify({'message': 'Email not found'}), 404

    # Verify password with bcrypt
    valid_password = bcrypt.checkpw(password.encode('utf-8'), valid_user['password'])

    if not valid_password:
        return jsonify({'message': 'Password or Username is incorrect'}), 401

    # Generate JWT token
    token = jwt.encode(
        {
            'id': str(valid_user['_id']),  # MongoDB stores IDs as ObjectId, so we convert it to string
            'exp': datetime.utcnow() + timedelta(hours=1)  # Correct usage of datetime and timedelta
        },
        SECRET_KEY,  # Use the secret key
        algorithm="HS256"
    )

    # Remove the password from the user data before sending the response
    user_data = {key: value for key, value in valid_user.items() if key != 'password'}

    # Convert any ObjectId in the user_data to string
    for key, value in user_data.items():
        if isinstance(value, ObjectId):
            user_data[key] = str(value)

    # Create a response with the JWT token as an HTTP-only cookie
    response = make_response(jsonify(user_data), 200)
    response.set_cookie(
        'access_token',
        token,
        expires=datetime.utcnow() + timedelta(hours=1)  # Correct usage of datetime and timedelta
    )

    return response

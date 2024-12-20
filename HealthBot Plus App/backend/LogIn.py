from flask import jsonify, request, make_response
from datetime import datetime, timedelta
import bcrypt
import jwt
from bson import ObjectId
import os

SECRET_KEY = 'Isara'

def LogIn(request, db):
    collection = db['user']
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    valid_user = collection.find_one({'email': email})

    if not valid_user:
        return jsonify({'message': 'Email not found'}), 404

    valid_password = bcrypt.checkpw(password.encode('utf-8'), valid_user['password'])

    if not valid_password:
        return jsonify({'message': 'Password or Username is incorrect'}), 401

    token = jwt.encode(
        {
            'id': str(valid_user['_id']),
            'exp': datetime.utcnow() + timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    user_data = {key: value for key, value in valid_user.items() if key != 'password'}

    for key, value in user_data.items():
        if isinstance(value, ObjectId):
            user_data[key] = str(value)

    response = make_response(jsonify(user_data), 200)
    response.set_cookie(
        'access_token',
        token,
        expires=datetime.utcnow() + timedelta(hours=1),
        httponly=True,
        samesite='None',
        secure=True
    )

    return response

from flask import jsonify
from bson import ObjectId

from flask import jsonify
from bson import ObjectId

def Update(request, db):    
    user_data = request.get_json()

    # Extract user fields from the incoming data
    user_id = user_data.get('id')
    name = user_data.get('name')
    age = user_data.get('age')
    sex = user_data.get('sex')
    contact = user_data.get('contact')
    profile = user_data.get('profile')

    try:
        # Convert the string id to ObjectId
        filter_query = {'_id': ObjectId(user_id)}
    except Exception as e:
        return jsonify({"error": "Invalid ID format"}), 400

    # Define the update data
    update_data = {
        '$set': {
            'name': name,
            'age': age,
            'sex': sex,
            'contact': contact,
            'profile': profile  
        }
    }

    # Perform the update
    result = db['user'].update_one(filter_query, update_data)
  
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    # Fetch the updated user
    updated_user = db['user'].find_one(filter_query)

    # Function to convert any non-serializable fields (e.g., ObjectId or bytes)
    def make_serializable(document):
        document['_id'] = str(document['_id'])  # Convert ObjectId to string
        # Check for bytes fields and remove them if found
        for key, value in document.items():
            if isinstance(value, bytes):
                document[key] = value.decode('utf-8', errors='ignore')  # You can also choose to remove or convert bytes
        return document

    # Convert any ObjectId or non-serializable fields
    updated_user = make_serializable(updated_user)

    # Return the updated user details
    return jsonify(updated_user), 200


def Google_Login(request, db):
        data = request.get_json()
        
        collection = db['user']


        email = data.get('email')

        valid_user = collection.find_one({'email': email})

        if not valid_user:
            return jsonify({'message': 'Email not found'}), 404

        token = jwt.encode(
            {
                'id': str(valid_user['_id']),
                'exp': datetime.utcnow() + timedelta(hours=1)
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        user_data = {key: value for key, value in valid_user.items() if key != 'password'}

        for key, value in user_data.items():
            if isinstance(value, ObjectId):
                user_data[key] = str(value)

        response = make_response(jsonify(user_data), 200)
        response.set_cookie(
            'access_token',
            token,
            expires=datetime.utcnow() + timedelta(hours=1),
            httponly=True,
            samesite='None',
            secure=True
        )

        return response

def get_Doctor(request, db):
    try:
        # Get the request data
        data = request.get_json()
        print(data)
        doctor_id = data.get('doctor_id')
        doctor_id = ObjectId(doctor_id)
        collection = db['user']
        
        if not doctor_id:
            return jsonify({"error": "No doctorId provided"}), 400

        # Query the MongoDB database for the doctor using doctorId
        doctor = collection.find_one({"_id": doctor_id})
        
        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

        # Create a response with doctor details
        doctor_data = {
            "id": str(doctor["_id"]),
            "name": doctor.get("name", "Unknown"),
            "sex": doctor.get("sex", "Unknown"),
            "email": doctor.get("email", "Unknown"),
            "image": doctor.get("profile", "https://cdn-icons-png.flaticon.com/512/3774/3774299.png")  # Default image if not provided
        }
        return jsonify(doctor_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

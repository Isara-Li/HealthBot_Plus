from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from pymongo import MongoClient
import os
import datetime
import random
import bcrypt

def reset_Password(mail, s,request, db): 
    users_collection = db["user"]
    data = request.get_json()
    email = data.get('email')

    # Find the user by email in MongoDB
    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({'message': 'User not found. Please Signup first.'}), 404

    try:
        # Generate a six-digit numerical token
        token = random.randint(100000, 999999)

        # Set token and expiration time in MongoDB
        users_collection.update_one(
            {"email": email},
            {"$set": {
                "reset_password_token": str(token), 
                "reset_password_expires": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }}
        )

        # Send email
        msg = Message(
            'Password Reset Request',
            sender='noreply@healthbot.com',
            recipients=[email]
        )

        msg.body = f'''To reset your password, enter the below code in the app:
{token}

If you did not make this request, simply ignore this email.
'''
        mail.send(msg)

        return jsonify({'message': 'email sent'}), 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Server error', 'error': str(e)}), 500


def verify_Code(request, db):
    users_collection = db["user"]
    data = request.get_json()
    email = data.get('email')
    entered_code = data.get('code')

    print(data)

    # Check if the email and code were provided
    if not email or not entered_code:
        return jsonify({"message": "Email and code are required"}), 400

    # Find user by email
    user = users_collection.find_one({"email": email})

    # If user doesn't exist
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if the user has a reset code
    if 'reset_password_token' not in user:
        return jsonify({"message": "No reset code found for this user"}), 400

    # Check if the entered code matches the stored reset code
    if user['reset_password_token'] != entered_code:
        return jsonify({"message": "Invalid code"}), 400

    # Optional: Check if the reset code has expired (assuming you store a code expiration timestamp)
    current_time = datetime.datetime.utcnow()
    if 'reset_password_expires' in user:
        expiration_time = user['reset_password_expires']
        if current_time > expiration_time:
            return jsonify({"message": "Code has expired"}), 400

    return jsonify({"message": "success"}), 200

def update_Password(request, db):
    users_collection = db["user"]
    data = request.get_json()
    email = data.get('email')
    password = data.get('newPassword')

    # Check if the email and password were provided
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Find user by email
    user = users_collection.find_one({"email": email})

    password = password.encode('utf-8') 
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    # If user doesn't exist
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Update the user's password
    users_collection.update_one(
        {"email": email},
        {"$set": {
            "password": hashed_password,
            "reset_password_token": None,
            "reset_password_expires": None
        }}
    )

    return jsonify({"message": "success"}), 200



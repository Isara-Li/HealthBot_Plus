from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from pymongo import MongoClient
import os
import datetime

def reset_Password(mail,s,request,db): 
    users_collection = db["user"]
    data = request.get_json()
    email = data.get('email')

    # Find the user by email in MongoDB
    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({'message': 'User not found'}), 404

    try:
        # Generate a token
        token = s.dumps(email, salt='email-reset')

        # Set token and expiration time in MongoDB
        users_collection.update_one(
            {"email": email},
            {"$set": {
                "reset_password_token": token,
                "reset_password_expires": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }}
        )

        # Send email
        msg = Message(
            'Password Reset Request',
            sender='noreply@yourdomain.com',
            recipients=[email]
        )

        link = f'http://localhost:5000/reset/{token}'
        msg.body = f'''To reset your password, visit the following link:
{link}

If you did not make this request, simply ignore this email.
'''
        mail.send(msg)

        return jsonify({'message': 'Password reset email sent'}), 200

    except Exception as e:
        return jsonify({'message': 'Server error', 'error': str(e)}), 500

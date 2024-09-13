from flask import jsonify
from datetime import datetime
import bcrypt
from bson import ObjectId  # Import to handle ObjectId

def SignUp(request, db):
    # Get the user input
    user_input = request.json
    collection = db['patient']

    # Check if a user with the same email already exists
    existing_user = collection.find_one({"email": user_input['email']})
    
    if existing_user:
        # If user exists, return an error response
        return jsonify({"status": "error", "message": "User already exists"}), 400

    # Parse birthday and calculate age
    birthday_str = user_input['birthday']
    birthday = datetime.strptime(birthday_str, '%Y-%m-%d')
    today = datetime.today()
    age = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))

    # Hash the password using bcrypt
    password_plain = user_input['password'].encode('utf-8')  # Encode to bytes
    hashed_password = bcrypt.hashpw(password_plain, bcrypt.gensalt())  # Hash the password

    # Prepare the data to be inserted
    patient_data = {
        "name": user_input['name'],
        "email": user_input['email'],
        "age": age,
        "country": user_input['country'],
        "sex": user_input['sex'],
        "password": hashed_password,
        "reports": []
    }

    # Insert the document into the collection
    result = collection.insert_one(patient_data)
    print(result)
    print(f"Document inserted with ID: {result.inserted_id}")
    
    if result.inserted_id is None:
        return jsonify({"status": "error", "message": "Failed to register user"}), 500

    # Retrieve the newly inserted user document by its ID
    new_user = collection.find_one({"_id": ObjectId(result.inserted_id)})

    # Remove the password before returning the user information
    if new_user:
        new_user['_id'] = str(new_user['_id'])  # Convert ObjectId to string
        del new_user['password']  # Remove the password field for security

    # Return success response with user details
    return jsonify({
        "status": "Ok",
        "user": new_user,
        "message": "User successfully registered"
    }), 201
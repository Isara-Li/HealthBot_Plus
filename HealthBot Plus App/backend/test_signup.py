import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from datetime import datetime
import bcrypt
from bson import ObjectId

from SignUp import SignUp


app = Flask(__name__)

class SignUpTestCase(unittest.TestCase):

    @patch('app.db')  # Mock the database
    def test_signup_success(self, mock_db):
        mock_request = MagicMock()
        # Sample user data
        mock_request.json = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password123",
            "birthday": "1990-01-01",
            "country": "USA",
            "sex": "Male"
        }

        # Mock the database 'find_one' to simulate that no existing user exists
        mock_db['user'].find_one.return_value = None

        # Mock the database 'insert_one' to simulate successful insertion
        mock_db['user'].insert_one.return_value.inserted_id = ObjectId()

        with app.test_request_context(json=mock_request.json):
            response = SignUp(mock_request, mock_db)

            # Check if signup was successful and status code is 201
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            self.assertEqual(status_code, 201)
            self.assertIn("User successfully registered", response.get_json().get("message"))

    @patch('app.db')
    def test_signup_user_already_exists(self, mock_db):
        mock_request = MagicMock()
        # Sample user data
        mock_request.json = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password123",
            "birthday": "1990-01-01",
            "country": "USA",
            "sex": "Male"
        }

        # Mock the database 'find_one' to simulate that the user already exists
        mock_db['user'].find_one.return_value = {"_id": ObjectId(), "email": "johndoe@example.com"}

        with app.test_request_context(json=mock_request.json):
            response = SignUp(mock_request, mock_db)

            # Check if signup fails due to user already existing and status code is 400
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            self.assertEqual(status_code, 400)
            self.assertIn("User already exists", response.get_json().get("message"))





    @patch('app.db')
    def test_signup_db_insertion_failure(self, mock_db):
        mock_request = MagicMock()
        # Sample user data
        mock_request.json = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password123",
            "birthday": "1990-01-01",
            "country": "USA",
            "sex": "Male"
        }

        # Mock the database 'find_one' to simulate that no existing user exists
        mock_db['user'].find_one.return_value = None

        # Mock the database 'insert_one' to simulate a failed insertion (return None)
        mock_db['user'].insert_one.return_value.inserted_id = None

        with app.test_request_context(json=mock_request.json):
            response = SignUp(mock_request, mock_db)

            # Check if signup fails due to database insertion failure
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            self.assertEqual(status_code, 500)
            self.assertIn("Failed to register user", response.get_json().get("message"))

if __name__ == '__main__':
    unittest.main()

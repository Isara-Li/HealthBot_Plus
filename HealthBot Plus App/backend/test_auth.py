import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify, make_response
from bson import ObjectId
from datetime import datetime, timedelta
import bcrypt
import jwt

from LogIn import LogIn,Update,Google_Login,get_Doctor


SECRET_KEY = 'Isara'

app = Flask(__name__)

class AuthTestCase(unittest.TestCase):

    @patch('app.db')
    def test_login_success(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"email": "test@example.com", "password": "password123"}

        # Mock valid user in the database
        mock_db['user'].find_one.return_value = {
            '_id': ObjectId(),
            'email': 'test@example.com',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt())  # Hashed password
        }

        with app.test_request_context(json={"email": "test@example.com", "password": "password123"}):
            response = LogIn(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if login is successful and JWT token is generated
            self.assertEqual(status_code, 200)
            self.assertIn('access_token', response.headers.get('Set-Cookie'))

    @patch('app.db')
    def test_login_invalid_password(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"email": "test@example.com", "password": "wrongpassword"}

        # Mock valid user in the database
        mock_db['user'].find_one.return_value = {
            '_id': ObjectId(),
            'email': 'test@example.com',
            'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt())  # Correct hashed password
        }

        with app.test_request_context(json={"email": "test@example.com", "password": "wrongpassword"}):
            response = LogIn(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if the password is invalid
            self.assertEqual(status_code, 401)
            self.assertIn("Password or Username is incorrect", response.get_json().get("message"))

    @patch('app.db')
    def test_login_email_not_found(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"email": "test@example.com", "password": "password123"}

        # Mock no user found in the database
        mock_db['user'].find_one.return_value = None

        with app.test_request_context(json={"email": "test@example.com", "password": "password123"}):
            response = LogIn(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if the email is not found
            self.assertEqual(status_code, 404)
            self.assertIn("Email not found", response.get_json().get("message"))

    @patch('app.db')
    def test_update_user_success(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {
            "id": str(ObjectId()), "name": "John", "age": 30, "sex": "Male", "contact": "1234567890", "profile": "url"
        }

        # Mock update result and find_one result
        mock_db['user'].update_one.return_value.matched_count = 1
        mock_db['user'].find_one.return_value = {
            '_id': ObjectId(), "name": "John", "age": 30, "sex": "Male", "contact": "1234567890", "profile": "url"
        }

        with app.test_request_context(json={
            "id": str(ObjectId()), "name": "John", "age": 30, "sex": "Male", "contact": "1234567890", "profile": "url"
        }):
            response = Update(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if update is successful
            self.assertEqual(status_code, 200)
            self.assertIn("John", response.get_json().get("name"))

    @patch('app.db')
    def test_google_login_success(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"email": "test@example.com"}

        # Mock valid user in the database
        mock_db['user'].find_one.return_value = {
            '_id': ObjectId(),
            'email': 'test@example.com',
            'password': 'hashed_password'
        }

        with app.test_request_context(json={"email": "test@example.com"}):
            response = Google_Login(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if Google login is successful
            self.assertEqual(status_code, 200)
            self.assertIn('access_token', response.headers.get('Set-Cookie'))

    @patch('app.db')
    def test_get_doctor_success(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"doctor_id": str(ObjectId())}

        # Mock valid doctor in the database
        mock_db['user'].find_one.return_value = {
            '_id': ObjectId(),
            'name': 'Dr. Smith',
            'email': 'dr.smith@example.com',
            'sex': 'Male',
            'profile': 'profile_url'
        }

        with app.test_request_context(json={"doctor_id": str(ObjectId())}):
            response = get_Doctor(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if doctor details are successfully retrieved
            self.assertEqual(status_code, 200)
            self.assertIn("Dr. Smith", response.get_json().get("name"))

    @patch('app.db')
    def test_get_doctor_not_found(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"doctor_id": str(ObjectId())}

        # Mock no doctor found in the database
        mock_db['user'].find_one.return_value = None

        with app.test_request_context(json={"doctor_id": str(ObjectId())}):
            response = get_Doctor(mock_request, mock_db)

            # Check if the response is a Flask Response object
            if isinstance(response, tuple):
                response, status_code = response  # Unpack tuple
            else:
                status_code = response.status_code  # Handle Flask Response

            # Check if doctor is not found
            self.assertEqual(status_code, 404)
            self.assertIn("Doctor not found", response.get_json().get("error"))

if __name__ == '__main__':
    unittest.main()

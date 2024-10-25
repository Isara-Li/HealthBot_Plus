import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, request, jsonify
from bson import ObjectId
import json

from Report import get_Report,update_report_status,get_unique_report,update_report_comment,update_model_accuracy,get_Report_Patient

app = Flask(__name__)

class ReportTestCase(unittest.TestCase):

   # Example updated test case:
    @patch('app.db')  # Assuming 'app' is the correct module name for your app.py file
    def test_get_report(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"userId": "doctor123"}
        
        # Mock the database find method to return test data
        mock_db["report"].find.return_value = [
            {"_id": ObjectId(), "doctor_id": "doctor123", "report_data": "test report"}
        ]

        # Test the get_Report function using the mocked request and db
        with app.test_request_context(json={"userId": "doctor123"}):
            response = get_Report(mock_request, mock_db)
            
            # Accessing response content and status code
            response_data, status_code = response
            self.assertEqual(status_code, 200)
            self.assertIn("reports", json.loads(response_data.get_data(as_text=True)))


    @patch('app.db')  # Assuming 'app' is the correct module
    def test_update_report_status(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"reportId": "612e4f653d141f5aeedf92e7", "status": "Reviewed"}
        
        # Mock the update_one method of the collection
        mock_db["report"].update_one.return_value.matched_count = 1

        with app.test_request_context(json={"reportId": "612e4f653d141f5aeedf92e7", "status": "Reviewed"}):
            # Call the update_report_status function
            response_tuple = update_report_status(mock_request, mock_db)

            # Since the function returns a tuple (json_response, status_code), unpack it
            response_data, status_code = response_tuple

            # Verify the status code and response content
            self.assertEqual(status_code, 200)
            self.assertIn("success", json.loads(response_data.get_data(as_text=True)))

    @patch('app.db')
    def test_get_unique_report(self, mock_db):
        mock_request = MagicMock()
        mock_db["report"].find_one.return_value = {"_id": ObjectId(), "report_data": "test report"}

        with app.test_request_context():
            response_tuple = get_unique_report("612e4f653d141f5aeedf92e7", mock_request, mock_db)

            # Unpack the response and status code from the tuple
            response, status_code = response_tuple

            # Verify the status code
            self.assertEqual(status_code, 200)

            # Since response is still a Flask response object, check the data
            self.assertIn("report_data", json.loads(response.get_data(as_text=True)))


    @patch('app.db')  # Assuming 'app' is the correct module
    def test_update_report_comment(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"doctor_comment": "New Comment"}
        
        # Mock the update_one method of the collection
        mock_db["report"].update_one.return_value.matched_count = 1

        with app.test_request_context(json={"doctor_comment": "New Comment"}):
            # Call the update_report_comment function
            response_tuple = update_report_comment("612e4f653d141f5aeedf92e7", mock_request, mock_db)

            # Since the function returns a tuple (json_response, status_code), unpack it
            response_data, status_code = response_tuple

            # Verify the status code and response content
            self.assertEqual(status_code, 200)
            self.assertIn("success", json.loads(response_data.get_data(as_text=True)))

    @patch('app.db')
    def test_update_model_accuracy(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"model_accuracy": 0.85}
        mock_db["report"].update_one.return_value.matched_count = 1

        with app.test_request_context(json={"model_accuracy": 0.85}):
            # Call the function and unpack the tuple response
            response_tuple = update_model_accuracy("612e4f653d141f5aeedf92e7", mock_request, mock_db)

            # Unpack response data and status code
            response_data, status_code = response_tuple

            # Verify the status code
            self.assertEqual(status_code, 200)

            # Check if the response contains 'success'
            self.assertIn("success", json.loads(response_data.get_data(as_text=True)))


    @patch('app.db')
    def test_get_report_patient(self, mock_db):
        mock_request = MagicMock()
        mock_request.get_json.return_value = {"userId": "patient123"}

        # Mock the find method to return test data
        mock_db["report"].find.return_value = [
            {"_id": ObjectId(), "user_id": "patient123", "report_data": "test report"}
        ]

        with app.test_request_context(json={"userId": "patient123"}):
            # Call the function and unpack the tuple response
            response_tuple = get_Report_Patient(mock_request, mock_db)

            # Unpack response and status code
            response_data, status_code = response_tuple

            # Verify the status code
            self.assertEqual(status_code, 200)

            # Verify the response content
            self.assertIn("reports", json.loads(response_data.get_data(as_text=True)))

if __name__ == '__main__':
    result = unittest.main(exit=False)
    tests_run = result.result.testsRun
    errors = len(result.result.errors)
    failures = len(result.result.failures)
    skipped = len(result.result.skipped)
    successes = tests_run - (errors + failures + skipped)

    print("\n----------------------------------------------------------------------")
    print(f"Total Tests: {tests_run}")
    print(f"Success: {successes}")
    print(f"Failures: {failures}")
    print(f"Errors: {errors}")
    print(f"Skipped: {skipped}")
import unittest
from flask import Flask
from pymongo import MongoClient
import mongomock
from app import app  # Import your Flask app

class MongoDBTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Mock MongoDB instance
        cls.client = mongomock.MongoClient()
        cls.db = cls.client['healthbot']
        app.config['TESTING'] = True
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/testdb'  # Use mock URI for test
        cls.app = app.test_client()

    def setUp(self):
        # This method runs before every test
        self.collection = self.db['report']

    def tearDown(self):
        # This method runs after every test
        self.collection.delete_many({})  # Clear the collection after each test

    def test_create_mel_report(self):
        # Simulate creating a melanoma report
        report_data = {
            'user_id': 'test_user_id',
            'user_name': 'Test User',
            'doctor_id': 'test_doctor_id',
            'melanoma_probability': 0.75,
            'xai_image_1': 'firebase_url_1',
            'xai_image_2': 'firebase_url_2',
            'image': 'test_image_url',
            'sex': 'Male',
            'age': 30,
            'anatom_site_general_challenge': 'Torso',
            'doctor_name': 'Test Doctor',
            'doctor_email': 'doctor@example.com',
            'user_profile': 'test_profile',
            'user_email': 'user@example.com',
            'is_melanoma': "Yes"
        }
        self.collection.insert_one(report_data)
        
        # Retrieve the inserted report
        inserted_report = self.collection.find_one({'user_id': 'test_user_id'})
        
        # Check if report is correctly inserted
        self.assertIsNotNone(inserted_report)
        self.assertEqual(inserted_report['user_name'], 'Test User')
        self.assertEqual(inserted_report['melanoma_probability'], 0.75)

    def test_create_dis_report(self):
        # Simulate creating a disease report
        report_data = {
            'user_id': 'test_user_id',
            'user_name': 'Test User',
            'doctor_id': 'test_doctor_id',
            'disease_class': 'Basal Cell Carcinoma (bcc)',
            'disease_probability': 0.85,
            'xai_image_1': 'firebase_url_1',
            'xai_image_2': 'firebase_url_2',
            'image': 'test_image_url',
            'sex': 'Male',
            'age': 45,
            'anatom_site_general_challenge': 'Head/Neck',
            'doctor_name': 'Test Doctor',
            'doctor_email': 'doctor@example.com',
            'user_profile': 'test_profile',
            'user_email': 'user@example.com',
            'is_melanoma': "No"
        }
        self.collection.insert_one(report_data)
        
        # Retrieve the inserted report
        inserted_report = self.collection.find_one({'user_id': 'test_user_id'})
        
        # Check if report is correctly inserted
        self.assertIsNotNone(inserted_report)
        self.assertEqual(inserted_report['disease_class'], 'Basal Cell Carcinoma (bcc)')
        self.assertEqual(inserted_report['disease_probability'], 0.85)

if __name__ == '__main__':
    unittest.main()

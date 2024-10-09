from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
import cv2
from transformers import AutoModel, AutoProcessor, AutoTokenizer
from PIL import Image
from transformers import SwinForImageClassification, AutoConfig, AutoProcessor
from keras.layers import TFSMLayer
from transformers import AutoFeatureExtractor
from tensorflow.keras.preprocessing import image
from lime import lime_image
from skimage.segmentation import mark_boundaries
from tensorflow.keras.preprocessing.image import img_to_array
import matplotlib.pyplot as plt
import os
from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
from dotenv import load_dotenv
import openai
from chatbot import diagnose
from pymongo import MongoClient
from SignUp import SignUp
from LogIn import LogIn,Update,Google_Login,get_Doctor
from gradio_client import Client, handle_file
import firebase_admin
from firebase_admin import credentials
from flask import Flask, send_file, jsonify
import firebase_admin
from firebase_admin import credentials, storage
from io import BytesIO
import urllib.parse
from datetime import datetime


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


mongo_uri = 'mongodb+srv://isara:isara@healthbot.p5i8q.mongodb.net/healthbot?retryWrites=true&w=majority&appName=healthbot'
client = MongoClient(mongo_uri)


cred = credentials.Certificate(r"C:\Users\Isara Liyanage\Desktop\healthbotplus-firebase-adminsdk-ysm0p-be95ee6fe0.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'healthbotplus.appspot.com'  # Your Firebase storage bucket URL
})

db = client['healthbot'] 

lesion_type_dict = {
    0: 'Melanocytic-nevi',
    1: 'Melanoma',
    2: 'Benign-keratosis-like-lesions',
    3: 'Basal-cell-carcinoma',
    4: 'Actinic-keratoses',
    5: 'Vascular-lesions',
    6: 'Dermatofibroma'
}

def upload_to_firebase(local_file_path, filename):
    bucket = storage.bucket()
    blob = bucket.blob(filename)
    blob.upload_from_filename(local_file_path)
    blob.make_public()
    return blob.public_url

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json       
    sex = int(data['sex']) 
    age_approx = int(data['age_approx'])
    anatom_site_general_challenge = int(data['anatom_site_general_challenge'])
    image = data['image_url']

    
    client = Client("Yasiru2002/Melanoma_Model")
    result = client.predict(
            image=handle_file(image),
            sex=sex,
            age_approx=age_approx,
            anatom_site_general_challenge= anatom_site_general_challenge,
            api_name="/predict"
    )


    image_path_1 = result[1]
    image_path_2 = result[2]

    # Upload images to Firebase and get the URLs
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    firebase_url_1 = upload_to_firebase(image_path_1, f"xai_image_1_{current_time}.png")
    firebase_url_2 = upload_to_firebase(image_path_2, f"xai_image_2_{current_time}.png")

    # Print Firebase URLs in the console
    print("Image 1 URL:", firebase_url_1)
    print("Image 2 URL:", firebase_url_2)
    

    return jsonify({'result': 'Melanoma', 'probability': 0.9})

@app.route('/chatbot', methods=['POST'])
def handle_diagnosis():
    return diagnose(request)

@app.route('/signup', methods=['POST'])
def signup():
    return SignUp(request,db)

@app.route('/login', methods=['POST'])
def login():
    return LogIn(request,db)

@app.route('/update', methods=['POST'])
def update():
    return Update(request,db)

@app.route('/googlelogin', methods=['POST'])
def google_login():
    return Google_Login(request,db)

@app.route('/getdoctor', methods=['POST'])
def get_doctor():
    return get_Doctor(request,db)



if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
import cv2
from transformers import AutoModel, AutoProcessor, AutoTokenizer
import torch
from PIL import Image
from transformers import SwinForImageClassification, AutoConfig, AutoProcessor
import wandb
from keras.layers import TFSMLayer
from transformers import AutoFeatureExtractor
from tensorflow.keras.preprocessing import image
from lime import lime_image
from skimage.segmentation import mark_boundaries
from tensorflow.keras.preprocessing.image import img_to_array
import matplotlib.pyplot as plt
import os
import openai
from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import openai


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the pre-trained model
melanoma_model = load_model(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\skin.h5')

model_checkpoint = "microsoft/swin-tiny-patch4-window7-224"
feature_extractor = AutoFeatureExtractor.from_pretrained(model_checkpoint)

model_layer = TFSMLayer(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\skin_model', call_endpoint='serving_default')

model_xai = load_model(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\model_xai.h5')

openai.api_key = "sk-ZjPyGb_zTnLPx-1ko4FGy5UGDQnEBxyRoNkrqklKe5T3BlbkFJWEjSwB0_jZZ4euSpAnyY9vksNqAPc5_Zg1iKnA3cwA"

token_hugging_face = "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"
headers = {"Authorization": f"Bearer {token_hugging_face}"}
API_URL_RECOGNITION = "https://api-inference.huggingface.co/models/openai/whisper-tiny.en"
API_URL_DIAGNOSTIC = "https://api-inference.huggingface.co/models/abhirajeshbhai/symptom-2-disease-net"

disease_model = tf.keras.Sequential([
    model_layer
])

lesion_type_dict = {
    0: 'Melanocytic-nevi',
    1: 'Melanoma',
    2: 'Benign-keratosis-like-lesions',
    3: 'Basal-cell-carcinoma',
    4: 'Actinic-keratoses',
    5: 'Vascular-lesions',
    6: 'Dermatofibroma'
}

def preprocess_image_for_melanoma(image):
    #image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, (128, 128))
    image = image / 255.0  # Normalizing the image
    return image

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    

    
    sex = data['sex']
 
    age_approx = float(data['age_approx'])
    anatom_site_general_challenge = data['anatom_site_general_challenge']
    print("Isara Liyanage",anatom_site_general_challenge)
    anatom_site_general_challenge = 0

    
    try:
        b64str = data['image']
        encoded_data = b64str.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    except tf.errors.InvalidArgumentError:
        return jsonify({'error': 'Invalid base64 string'}), 400
    

    processed_image = preprocess_image_for_melanoma(image)
    
    patient_data = [sex, age_approx, anatom_site_general_challenge]
    patient_data = np.array(patient_data).reshape((1, -1))  # Adjust the shape as per model requirement
    
    processed_image = tf.expand_dims(processed_image, axis=0)
    
    # Perform the prediction
    prediction = melanoma_model.predict([processed_image, patient_data])
    
    # Convert prediction to a human-readable format
    prediction_class = np.argmax(prediction, axis=-1)[0]

    if prediction_class == 0:
        # Benign
        disease_prediction = predict_disease(image, disease_model, feature_extractor)
        disease_prediction = int(disease_prediction)
        disease_prediction = lesion_type_dict[disease_prediction]
        get_xai(image)
        return jsonify({
            'prediction': 'Benign', 
            'disease_prediction': disease_prediction
        })
    
    # Return the prediction
    get_xai(image)
    return jsonify({'prediction': 'Malignant'})



def preprocess_image(image, feature_extractor):

    # Preprocess the image using the feature extractor
    inputs = feature_extractor(images=image, return_tensors="tf")
    return inputs['pixel_values']

def predict_disease(image, model, feature_extractor):
    pixel_values = preprocess_image(image, feature_extractor)
    outputs = model(pixel_values)
    
    print("Isara",outputs)
    if isinstance(outputs, dict):
        logits = outputs['logits']
    else:
        logits = outputs

    # Get the predicted class label
    predicted_label = tf.argmax(logits, axis=-1).numpy()[0]

    return predicted_label



def load_and_preprocess_image_xai(image, target_size=(224, 224, 3)):
    img = cv2.resize(image, (224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0 
    return img_array


def get_xai(image,save_dir='./static/xai_images/'):
    os.makedirs(save_dir, exist_ok=True)
    X_sample = load_and_preprocess_image_xai(image)

    # Initialize LIME explainer
    explainer = lime_image.LimeImageExplainer()

    # Explain the image
    explanation = explainer.explain_instance(
        X_sample[0].astype('double'),  
        model_xai.predict,            
        top_labels=2,                  
        hide_color=0,                 
        num_samples=1000              
    )

    # Visualize the explanation
    temp, mask = explanation.get_image_and_mask(
        explanation.top_labels[0],    
        positive_only=True,           
        num_features=5,                
        hide_rest=True                 
    )

    plt.imshow(mark_boundaries(temp / 2 + 0.5, mask))  # Display the image with boundaries around important features


    image_path = os.path.join(save_dir, 'xai_image.png')

    # Save the plot as an image file
    plt.savefig(image_path)
    plt.close()

    return None


# Function to recognize speech using Hugging Face API
def recognize_speech(audio_data):
    response = requests.post(API_URL_RECOGNITION, headers=headers, data=audio_data)
    response_content = response.content.decode("utf-8")
    print("Voice Recognition API Response:", response_content)
    try:
        return json.loads(response_content)['text']
    except KeyError:
        return None

# Function to generate diagnosis using OpenAI's GPT-3.5-turbo
def diagnostic_medic(voice_text):
    model_engine = "gpt-3.5-turbo"
    
    # Construct the message for the API
    messages = [
        {"role": "system", "content": "You are a medical expert."},
        {"role": "user", "content": f"Diagnose the following symptoms: {voice_text}"}
    ]
    
    # Call the OpenAI API
    response = openai.ChatCompletion.create(
        model=model_engine,  # Specify the model
        messages=messages,  # User query as part of conversation
        max_tokens=200,  # Max number of tokens for the response
        n=1,  # Number of responses expected from Chat GPT
        stop=None, 
        temperature=0.5  # Making responses deterministic
    )
    
    # Extract the response message content
    message = response.choices[0].message['content'].strip()
    
    print("Disease Prediction API Response:", message)
    
    return message

# Route to handle diagnosis requests
@app.route('/chatbot', methods=['POST'])
def diagnose():
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    audio_file = request.files['audio_file']
    audio_data = audio_file.read()

    # Recognize speech from audio
    text = recognize_speech(audio_data)
    print("Recognized text:", text)
    
    if text is None:
        return jsonify({"error": "Failed to recognize speech"}), 500
    
    # Get diagnosis from recognized speech text
    diagnosis = diagnostic_medic(text)
    
    if diagnosis is None:
        return jsonify({"error": "Failed to predict disease"}), 500
    
    # Construct the JSON response
    return jsonify({"text": text, "diagnosis": diagnosis})

if __name__ == '__main__':
    app.run(debug=True)
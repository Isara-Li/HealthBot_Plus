from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
import cv2

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
melanoma_model = load_model(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\skin.h5')

# Function to preprocess the image
def preprocess_image_for_melanoma(image):
    #image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, (128, 128))
    image = image / 255.0  # Normalizing the image
    return image

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Extracting data from the request
    #sex = data['sex']
    sex = 0
    #age_approx = float(data['age_approx'])
    age_approx = 70.0
    #anatom_site_general_challenge = data['anatom_site_general_challenge']
    anatom_site_general_challenge = 0

    
    try:
        b64str = data['image']
        encoded_data = b64str.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    except tf.errors.InvalidArgumentError:
        return jsonify({'error': 'Invalid base64 string'}), 400
    
    # Preprocess the image
    processed_image = preprocess_image_for_melanoma(image)
    
    # Prepare the input for the model (this part will vary depending on the actual model input requirements)
    patient_data = [sex, age_approx, anatom_site_general_challenge]
    patient_data = np.array(patient_data).reshape((1, -1))  # Adjust the shape as per model requirement
    
    # Expand dimensions for the image to match the batch size (1 in this case)
    processed_image = tf.expand_dims(processed_image, axis=0)
    
    # Perform the prediction
    prediction = melanoma_model.predict([processed_image, patient_data])
    
    # Convert prediction to a human-readable format
    prediction_class = np.argmax(prediction, axis=-1)[0]
    
    # Return the prediction
    return jsonify({'prediction': int(prediction_class)})

if __name__ == '__main__':
    app.run(debug=True)

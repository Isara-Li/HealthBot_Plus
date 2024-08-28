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


app = Flask(__name__)
CORS(app)



# Load the pre-trained model
melanoma_model = load_model(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\skin.h5')

model_checkpoint = "microsoft/swin-tiny-patch4-window7-224"
feature_extractor = AutoFeatureExtractor.from_pretrained(model_checkpoint)

model_layer = TFSMLayer(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\skin_model', call_endpoint='serving_default')

model_xai = load_model(r'C:\Users\Isara Liyanage\Documents\GitHub\HealthBot_Plus\HealthBot Plus App\backend\model\model_xai.h5')


disease_model = tf.keras.Sequential([
    model_layer
])

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

    if prediction_class == 0:
        # Benign
        disease_prediction = predict_disease(image, disease_model, feature_extractor)
        disease_prediction = int(disease_prediction)
        get_xai(image)
        return jsonify({
            'prediction': 'Benign', 
            'disease_prediction': disease_prediction
        })
    
    # Return the prediction
    get_xai(image)
    return jsonify({'prediction': 'Malignant'})



def preprocess_image(image, feature_extractor):
    # Load the image

    # Preprocess the image using the feature extractor
    inputs = feature_extractor(images=image, return_tensors="tf")
    return inputs['pixel_values']

def predict_disease(image, model, feature_extractor):
    # Preprocess the image
    pixel_values = preprocess_image(image, feature_extractor)

    # Get predictions from the model
    outputs = model(pixel_values)
    
    # Extract the relevant tensor from the outputs (e.g., 'logits' or 'logits' if it's a classification model)
    # For instance, if 'logits' is the key you want to use for prediction:
    print("Isara",outputs)
    if isinstance(outputs, dict):
        logits = outputs['logits']
    else:
        logits = outputs

    # Get the predicted class label
    predicted_label = tf.argmax(logits, axis=-1).numpy()[0]

    return predicted_label



def load_and_preprocess_image_xai(image, target_size=(224, 224, 3)):
    # Assuming image is already a NumPy array; resize and scale it
    img = cv2.resize(image, (224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Assuming the model expects inputs in the range [0, 1]
    return img_array


def get_xai(image,save_dir='./static/xai_images/'):
   # Ensure the save directory exists
    os.makedirs(save_dir, exist_ok=True)

    # Load and preprocess a sample image
    X_sample = load_and_preprocess_image_xai(image)

    # Initialize LIME explainer
    explainer = lime_image.LimeImageExplainer()

    # Explain the image
    explanation = explainer.explain_instance(
        X_sample[0].astype('double'),  # The image you want to explain
        model_xai.predict,             # The prediction function of your model
        top_labels=2,                  # Number of top labels to consider
        hide_color=0,                  # Color to hide parts of the image (black in this case)
        num_samples=1000               # Number of perturbed samples to generate
    )

    # Visualize the explanation
    temp, mask = explanation.get_image_and_mask(
        explanation.top_labels[0],     # The top predicted label
        positive_only=True,            # Show only positive contributions
        num_features=5,                # Number of features to highlight
        hide_rest=True                 # Hide the non-important parts of the image
    )

    plt.imshow(mark_boundaries(temp / 2 + 0.5, mask))  # Display the image with boundaries around important features

    # Define the file path where the image will be saved
    image_path = os.path.join(save_dir, 'xai_image.png')

    # Save the plot as an image file
    plt.savefig(image_path)
    plt.close()

    return None

if __name__ == '__main__':
    app.run(debug=True)
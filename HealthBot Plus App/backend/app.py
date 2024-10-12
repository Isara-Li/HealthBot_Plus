from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
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
from Report import get_Report,update_report_status,get_unique_report,update_report_comment,update_model_accuracy,get_Report_Patient


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


mongo_uri = 'mongodb+srv://isara:isara@healthbot.p5i8q.mongodb.net/healthbot?retryWrites=true&w=majority&appName=healthbot'
client = MongoClient(mongo_uri)


cred = credentials.Certificate(r"C:\Users\Isara Liyanage\Desktop\healthbotplus-firebase-adminsdk-ysm0p-be95ee6fe0.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'healthbotplus.appspot.com' 
})

db = client['healthbot'] 


def upload_to_firebase(local_file_path, filename):
    bucket = storage.bucket()
    blob = bucket.blob(filename)
    blob.upload_from_filename(local_file_path)
    blob.make_public()
    return blob.public_url

# Endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json       
        sex = int(data['sex']) 
        age_approx = int(data['age_approx'])
        anatom_site_general_challenge = int(data['anatom_site_general_challenge'])
        image = data['image_url']
        user_id = data['user_id']
        doctor_id = data['doctor_id']
        doctor_name = data['doctor_name']
        doctor_email = data['doctor_email']
        user_profile = data['user_profile']
        user_name = data['user_name']
        user_email = data['user_email']

        
        client = Client("Yasiru2002/Melanoma_Model")
        result = client.predict(
                image=handle_file(image),
                sex=sex,
                age_approx=age_approx,
                anatom_site_general_challenge= anatom_site_general_challenge,
                api_name="/predict"
        )
        melanoma_probability = float(result[0])
        if melanoma_probability > 0.65:       
            image_path_1 = result[1]
            image_path_2 = result[2]

            # Upload images to Firebase and get the URLs
            current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
            firebase_url_1 = upload_to_firebase(image_path_1, f"xai_image_1_{current_time}.png")
            firebase_url_2 = upload_to_firebase(image_path_2, f"xai_image_2_{current_time}.png")

            create_mel_report(user_id, user_name,user_email,doctor_id, melanoma_probability, firebase_url_1, firebase_url_2,image,sex,age_approx,anatom_site_general_challenge,doctor_name,doctor_email,user_profile)

            return jsonify({'result': 'Success'})
    except:
        return jsonify({'result': 'Error in the Melanoma Model'})

    else:
        try:
            client = Client("Yasiru2002/five_diseases_model")
            result = client.predict(
            image=handle_file(image),
            api_name="/predict"
            )  
            disease_probability = result[0] 
            image_path_1 = result[1]
            image_path_2 = result[2]

            # Upload images to Firebase and get the URLs
            current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
            firebase_url_1 = upload_to_firebase(image_path_1, f"xai_image_1_{current_time}.png")
            firebase_url_2 = upload_to_firebase(image_path_2, f"xai_image_2_{current_time}.png")

            disease_class = disease_probability.index(max(disease_probability))
            disease_probability = max(disease_probability)

            create_dis_report(user_id,user_name,user_email, doctor_id,  disease_class,disease_probability, firebase_url_1, firebase_url_2,image,sex,age_approx,anatom_site_general_challenge,doctor_name,doctor_email,user_profile)

            return jsonify({'result': 'Success'})
        except:
            return jsonify({'result': 'Error in the Disease Model'})
    
    return jsonify({'result': 'Success'})

def create_mel_report(user_id,user_name,user_email, doctor_id, melanoma_probability, firebase_url_1, firebase_url_2,image,sex,age_approx,anatom_site_general_challenge,doctor_name,doctor_email,user_profile):
    collection = db['report']

    if sex == 0: 
        sex = 'Male'
    else: 
        sex = "Female"

    if anatom_site_general_challenge == 0:
        anatom_site_general_challenge = 'Torso'
    elif anatom_site_general_challenge == 1:
        anatom_site_general_challenge = 'Lower Extremity'
    elif anatom_site_general_challenge == 2:
        anatom_site_general_challenge = 'Upper Extremity'
    elif anatom_site_general_challenge == 3:
        anatom_site_general_challenge = 'Head/Neck'
    elif anatom_site_general_challenge == 4:
        anatom_site_general_challenge = 'Palms/Soles'
    elif anatom_site_general_challenge == 5:
        anatom_site_general_challenge = 'Oral/Genital'

    report = {
        'user_id': user_id,
        'user_name': user_name,
        'doctor_id': doctor_id,
        'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'status': 'Pending',
        'model_accuracy': "Undefined",
        'melanoma_probability': melanoma_probability,
        'xai_image_1': firebase_url_1,
        'xai_image_2': firebase_url_2,
        'image': image,
        'sex' : sex,
        'age': age_approx,
        'anatom_site_general_challenge': anatom_site_general_challenge,
        'doctor_name': doctor_name,
        'doctor_email': doctor_email,
        'user_profile': user_profile,
        'doctor_comment': "None",
        'user_email': user_email,
        'is_melanoma': "Yes"

    }

    # Insert the report to the database
    result = collection.insert_one(report)
    print(f"Report inserted with ID: {result.inserted_id}")

def create_dis_report(user_id,user_name, user_email,doctor_id,  disease_class,disease_probability, firebase_url_1, firebase_url_2,image,sex,age_approx,anatom_site_general_challenge,doctor_name,doctor_email,user_profile):
    collection = db['report']

    if sex == 0: 
        sex = 'Male'
    else: 
        sex = "Female"

    if anatom_site_general_challenge == 0:
        anatom_site_general_challenge = 'Torso'
    elif anatom_site_general_challenge == 1:
        anatom_site_general_challenge = 'Lower Extremity'
    elif anatom_site_general_challenge == 2:
        anatom_site_general_challenge = 'Upper Extremity'
    elif anatom_site_general_challenge == 3:
        anatom_site_general_challenge = 'Head/Neck'
    elif anatom_site_general_challenge == 4:
        anatom_site_general_challenge = 'Palms/Soles'
    elif anatom_site_general_challenge == 5:
        anatom_site_general_challenge = 'Oral/Genital'

    if disease_probability > 0.5:
        if disease_class == 0:
            disease_class = 'Basal Cell Carcinoma (bcc)'
        elif disease_class == 1:
            disease_class = 'Actinic Keratoses and Intraepithelial Carcinoma (akiec)'
        elif disease_class == 2:
            disease_class = 'benign keratosis-like lesions (bkl)'
        elif disease_class == 3:
            disease_class = 'Dermatofibroma (df)'
        elif disease_class == 4:
            disease_class = 'Vascular Lesions (vasc)'
    else:
        disease_class = 'No Disease Detected. Seek a doctor for further evaluation'

    report = {
        'user_id': user_id,
        'user_name': user_name,
        'doctor_id': doctor_id,
        'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'status': 'Pending',
        'model_accuracy': "Undefined",
        'disease_class': disease_class,
        'disease_probability': disease_probability,
        'xai_image_1': firebase_url_1,
        'xai_image_2': firebase_url_2,
        'image': image,
        'sex' : sex,
        'age': age_approx,
        'anatom_site_general_challenge': anatom_site_general_challenge,
        'doctor_name': doctor_name,
        'doctor_email': doctor_email,
        'user_profile': user_profile,
        'doctor_comment': "None",
        'user_email': user_email,
        'is_melanoma': "No"

    }

    # Insert the report to the database
    result = collection.insert_one(report)
    print(f"Report inserted with ID: {result.inserted_id}")



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

@app.route('/getreports', methods=['POST'])
def get_report():
    return get_Report(request,db)

@app.route('/updatereportstatus', methods=['POST'])
def update_report():
    return update_report_status(request,db)
   
@app.route('/getreport/<report_id>', methods=['GET'])
def get_report_by_id(report_id):
    return get_unique_report(report_id,request,db)

@app.route('/updatereport/<report_id>', methods=['POST'])
def update_doctor_comment(report_id):
    return update_report_comment(report_id,request,db)

@app.route('/updatereportaccuracy/<report_id>', methods=['POST'])
def update_accuracy(report_id):
    return update_model_accuracy(report_id,request,db)

@app.route('/getreportsforpatient', methods=['POST'])
def get_report_patient():
    return get_Report_Patient(request,db)



if __name__ == '__main__':
    app.run(debug=True)
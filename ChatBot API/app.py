from flask import Flask, request, jsonify
import requests
import json
import time
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = 'sk-OSQI4rNJp5O7xQRgzonWq4OYW2E6ooKAnuLtwa0taTT3BlbkFJ3HFYmqdBJwgqwJvpmJFkxov4stA46XjyB3hn7dgEMA'


token_hugging_face = "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"
headers = {"Authorization": f"Bearer {token_hugging_face}"}
API_URL_RECOGNITION = "https://api-inference.huggingface.co/models/openai/whisper-tiny.en"
API_URL_DIAGNOSTIC = "https://api-inference.huggingface.co/models/abhirajeshbhai/symptom-2-disease-net"

def recognize_speech(audio_data):
    response = requests.post(API_URL_RECOGNITION, headers=headers, data=audio_data)
    response_content = response.content.decode("utf-8")
    print("Voice Recognition API Response:", response_content)
    try:
        return json.loads(response_content)['text']
    except KeyError:
        return None

"""def diagnostic_medic(voice_text):
    synthomps = {"inputs": voice_text}
    data = json.dumps(synthomps)
    response = requests.post(API_URL_DIAGNOSTIC, headers=headers, data=data)
    response_content = response.content.decode("utf-8")
    print("Disease Prediction API Response:", response_content)
    try:
        return json.loads(response_content)[0][0]['label']
    except (KeyError, IndexError) as e:
        print(f"Error parsing response: {e}")
        return None"""

def diagnostic_medic(voice_text):
    model_engine = "gpt-3.5-turbo"
    user_prompt = (f"{user_prompt}")
    #Open AI provided API method to get the response from Chat GPT
    completions = openai.Completion.create(
        engine=model_engine, 
        prompt=user_prompt,
        max_tokens=1024,
        n=1, 
        stop=None, 
        temperature=0.5 #making responses deterministic
    )
    # print(completions)
    message = completions.choices[0].text
    response = message.strip()
    response_content = response.content.decode("utf-8")
    print("Disease Prediction API Response:", response_content)
    try:
        return json.loads(response_content)[0][0]['label']
    except (KeyError, IndexError) as e:
        print(f"Error parsing response: {e}")
        return None

@app.route('/diagnose', methods=['POST'])
def diagnose():
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    audio_file = request.files['audio_file']
    audio_data = audio_file.read()
    text = recognize_speech(audio_data)
    if text is None:
        return jsonify({"error": "Failed to recognize speech"}), 500
    diagnosis = diagnostic_medic(text)
    if diagnosis is None:
        return jsonify({"error": "Failed to predict disease"}), 500
    return jsonify({"text": text, "diagnosis": diagnosis})

if __name__ == "__main__":
    app.run(debug=True)

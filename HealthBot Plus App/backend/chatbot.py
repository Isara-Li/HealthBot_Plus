import openai
import requests
import json
from flask import jsonify
import os

token_hugging_face = "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"

headers = {"Authorization": f"Bearer {token_hugging_face}"}
API_URL_RECOGNITION = "https://api-inference.huggingface.co/models/openai/whisper-tiny.en"
API_URL_DIAGNOSTIC = "https://api-inference.huggingface.co/models/abhirajeshbhai/symptom-2-disease-net"

openai.api_key = "sk-ZjPyGb_zTnLPx-1ko4FGy5UGDQnEBxyRoNkrqklKe5T3BlbkFJWEjSwB0_jZZ4euSpAnyY9vksNqAPc5_Zg1iKnA3cwA"



def recognize_speech(audio_data):
    response = requests.post(API_URL_RECOGNITION, headers=headers, data=audio_data)
    response_content = response.content.decode("utf-8")
    try:
        return json.loads(response_content)['text']
    except KeyError:
        return None

def diagnostic_medic(voice_text):
    model_engine = "gpt-3.5-turbo"
    messages = [
        {"role": "system", "content": "You are a medical expert."},
        {"role": "user", "content": f"Diagnose the following symptoms: {voice_text}"}
    ]
    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=messages,
        max_tokens=200,
        n=1,
        stop=None,
        temperature=0.5
    )
    return response.choices[0].message['content'].strip()

def diagnose(request):
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    audio_file = request.files['audio_file']
    audio_data = audio_file.read()

    text = recognize_speech(audio_data)
    print("Recognised Text",text)
    if text is None:
        return jsonify({"error": "Failed to recognize speech"}), 500

    diagnosis = diagnostic_medic(text)
    print("Diagnosis",diagnosis)
    if diagnosis is None:
        return jsonify({"error": "Failed to predict disease"}), 500

    return jsonify({"text": text, "diagnosis": diagnosis})

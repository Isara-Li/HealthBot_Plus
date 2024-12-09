# HealthBot+ 🚑💻

HealthBot+ is an AI-powered web application designed to support the early detection and management of skin diseases, including melanoma—a highly aggressive form of skin cancer. With a focus on leveraging state-of-the-art AI technologies, HealthBot+ provides a user-friendly platform that delivers reliable, preliminary assessments of skin lesions. By bridging the gap in dermatology expertise, it aims to ensure timely diagnoses and improved treatment outcomes.

🌐 **Live Demo**: [HealthBot+](https://health-bot-plus-frontend.vercel.app/)

---

## Table of Contents
- [Introduction](#introduction)
- [Demo Video](#demo-video)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [AI Models](#ai-models)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Contributors](#contributors)
- [License](#license)

---

## Introduction

Skin diseases, particularly melanoma, often require specialized dermatology expertise, which may not be accessible in all regions. HealthBot+ addresses this issue by providing a platform that utilizes advanced AI models to detect:
- Melanoma
- Actinic keratoses and intraepithelial carcinoma (akiec)
- Basal cell carcinoma (bcc)
- Benign keratosis-like lesions (bkl)
- Dermatofibroma (df)
- Melanocytic nevi (nv)
- Vascular lesions (vasc)

This application integrates state-of-the-art machine learning and natural language processing for early detection and management, empowering users with reliable and accessible diagnostic tools.

---

## Demo Video 🎥

Check out the demo video of HealthBot+ in action:

[![HealthBot+ Demo Video](https://img.youtube.com/vi/GAosly8RCoQ/0.jpg)](https://youtu.be/GAosly8RCoQ?si=7Ska-zxbI0oeHYI9)

---

## Key Features 🚀

- **AI-Powered Diagnosis**: Detect seven common skin conditions, including melanoma, using advanced AI models.
- **Explainable AI**: Grad-CAM visualizations for transparent, interpretable predictions.
- **Comprehensive Dashboards**:
  - **Patient Dashboard**: View and edit personal details, access report history, and track health insights.
  - **Doctor Dashboard**: Review patient reports, including AI predictions with Grad-CAM, and add comments for collaborative decision-making.
- **Chatbot Integration**: Powered by Whisper-tiny for ASR and OpenAI API for guided skin health advice.
- **Secure Authentication**: Google Firebase for secure login with OTP-based password recovery.
- **Automatic Report Sharing**: Generated reports are forwarded to the associated doctor for timely feedback.
- **Multi-Platform Hosting**: Hosted on Vercel, Koyeb, and Hugging Face.
- **Thorough Testing**: Ensured robustness using Jest, Cypress, unittest, and Apache JMeter.

---

## Technologies Used 💡

- **Frontend**: React.js
- **Backend**: Flask, Node.js
- **Database**: MongoDB
- **Authentication**: Google Firebase
- **Hosting Platforms**: Vercel, Koyeb, Hugging Face
- **Machine Learning**:
  - Fine-tuned Xception Model
  - Custom Convolutional Neural Network (CNN)
- **Explainable AI**: Grad-CAM for visualization
- **Chatbot**: Whisper-tiny and OpenAI API

---

## AI Models

### 1. **Fine-Tuned Xception Model for Melanoma Detection**
   - Based on the Xception architecture using depthwise separable convolutions for efficient, high-dimensional feature extraction.
   - Combines image data resized to 300x300 pixels with metadata (age, gender, anatomical site) for robust predictions.

### 2. **Custom CNN for Other Skin Conditions**
   - Detects six skin conditions, including basal cell carcinoma, actinic keratoses, and vascular lesions.
   - Architecture: Four convolutional blocks with pooling layers, followed by dense layers for feature refinement.

---

## Getting Started 🛠️

### Prerequisites
- **Node.js** and **npm**
- **Python** with Flask
- **MongoDB** server running locally or in the cloud
- **Google Firebase** project configured for authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/healthbot-plus.git
   cd healthbot-plus

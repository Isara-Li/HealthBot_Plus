import React, { useState } from 'react';
import Navbar from "../components/navbar";
import PatientCard from "../components/patient_card";

export default function Diagnose() {
    // Store the parameters in variables
    const ptitle = "Isara Liyanage";
    const pimageSrc = "https://cdn.vectorstock.com/i/500p/96/75/gray-scale-male-character-profile-picture-vector-51589675.jpg";
    const pdescription = [
        "ID - 12345",
        "Gender - Male",
        "Age - 22",
    ];
    const dtitle = "Dr. Fernando";
    const dimageSrc = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";
    const ddescription = [
        "ID - 12345",
        "Gender - Male",
        "Email - liyanageisara@gmail.com",
    ];

    // State to store uploaded image and selected body part
    const [uploadedImage, setUploadedImage] = useState(null);
    const [bodyPart, setBodyPart] = useState("");
    const pgender = "female"; // Sex attribute for the model (can be male/female)
    const page = 50.0; // Age_approx attribute for the model

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file); // This will convert the image to base64 format
        }
    };

    // Handle body part selection
    const handleBodyPartChange = (e) => {
        setBodyPart(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!uploadedImage || !bodyPart) {
            alert("Please upload an image and select a body part.");
            return;
        }

        // Prepare the payload
        const payload = {
            image: uploadedImage,
            sex: pgender,
            age_approx: page,
            anatom_site_general_challenge: 'lower extremity'
        };

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                console.log(data);
                /*alert(`Prediction: ${data.prediction}`);*/
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the prediction.');
        }
    };

    return (
        <div>
            <div className="App">
                <Navbar />
            </div>

            <div className="flex flex-wrap justify-between left-10 py-4 px-11">
                {/* Patient card section */}
                <PatientCard
                    title={ptitle}
                    imageSrc={pimageSrc}
                    description={pdescription}
                />
                <PatientCard
                    title={dtitle}
                    imageSrc={dimageSrc}
                    description={ddescription}
                />

                {/* Container for the image upload and dropdown */}
                <div className={`flex flex-col bg-gray-300 items-start p-4 border border-gray-400 rounded-lg shadow-lg w-full max-w-md ${uploadedImage ? 'h-auto' : 'h-64'}`}>
                    {/* Image upload section */}
                    <label className="mb-2 font-bold text-gray-700">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-4"
                    />

                    {/* Display uploaded image */}
                    {uploadedImage && (
                        <img
                            src={uploadedImage}
                            alt="Uploaded Preview"
                            className="mb-4 border border-gray-300"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    )}

                    {/* Dropdown for body part selection */}
                    <label className="mb-2 font-bold text-gray-700">Select Body Part:</label>
                    <select
                        value={bodyPart}
                        onChange={handleBodyPartChange}
                        className="p-2 border border-gray-300 rounded mb-4"
                    >
                        <option value="">--Select--</option>
                        <option value="upper extremity">Upper Extremity</option>
                        <option value="lower extremity">Lower Extremity</option>
                        <option value="torso">Torso</option>
                        <option value="head/neck">Head/Neck</option>
                        <option value="palm/soles">Palm/Soles</option>
                    </select>

                    {/* Submit button */}
                    <div className="w-full flex justify-center">
                        <button
                            className="w-1/2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

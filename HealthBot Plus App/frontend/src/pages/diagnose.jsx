import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import PatientCard from "../components/patient_card";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

export default function Diagnose() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    // Store the parameters in variables
    const ptitle = currentUser.name;
    const pimageSrc = currentUser.profile;
    const pdescription = [
        `ID - ${currentUser._id}`,
        `Gender - ${currentUser.sex}`,
        `Age - ${currentUser.age}`,
    ];

    const [dtitle, setDtitle] = useState("Dr. Fernando"); // State to store doctor details
    const [dimageSrc, setDimageSrc] = useState("https://cdn-icons-png.flaticon.com/512/3774/3774299.png");
    const [ddescription, setDdescription] = useState([
        "ID - 12345",
        "Gender - Male",
        "Email - liyanageisara@gmail.com",
    ]);
    const [loading, setLoading] = useState(true); // State to track loading status

    // Dictionary to encode body part
    const bodyPartEncoding = {
        'head/neck': 0,
        'lower extremity': 1,
        'oral/genital': 2,
        'palms/soles': 3,
        'torso': 4,
        'unknown': 5,
        'upper extremity': 6
    };

    // State to store uploaded image and selected body part
    const [uploadedImage, setUploadedImage] = useState(null);
    const [bodyPart, setBodyPart] = useState("");
    const pgender = "male";  // Assuming typo correction
    const page = 75.0;

    // Fetch doctor details when component mounts
    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/getdoctor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ doctor_id: currentUser.doctor_id }),
                });

                const data = await response.json();
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    // Update doctor details
                    setDtitle(data.name || 'Doctor');
                    setDimageSrc(data.image || dimageSrc); // Assuming API provides doctor image
                    setDdescription([
                        `ID - ${data.id}`,
                        `Gender - ${data.sex}`,
                        `Email - ${data.email}`,
                    ]);
                    console.log('Doctor data:', data); // Log the fetched doctor data
                }
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            } finally {
                setLoading(false); // Data has been fetched, stop loading
            }
        };

        fetchDoctorDetails();
    }, [currentUser.doctor_id]); // Dependency array includes currentUser.doctor_id to trigger useEffect when it changes

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

        // Encode the selected body part
        const encodedBodyPart = bodyPartEncoding[bodyPart] || bodyPartEncoding['unknown'];

        // Prepare the payload
        const payload = {
            image: uploadedImage,
            sex: pgender === 'male' ? 1 : 0,
            age_approx: page,
            anatom_site_general_challenge: encodedBodyPart
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

    // Render the content
    if (loading) {
        return <div>Loading...</div>;  // Display "Loading..." while the data is being fetched
    }

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
                        <option value="palms/soles">Palm/Soles</option>
                        <option value="oral/genital">Oral/Genital</option>
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

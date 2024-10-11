import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import PatientCard from "../components/patient_card";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { app } from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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

    const [doctorData, setDoctorData] = useState(null);

    const [dtitle, setDtitle] = useState("Dr. Fernando");
    const [dimageSrc, setDimageSrc] = useState("https://cdn-icons-png.flaticon.com/512/3774/3774299.png");
    const [ddescription, setDdescription] = useState([
        "ID - 12345",
        "Gender - Male",
        "Email - liyanageisara@gmail.com",
    ]);
    const [loading, setLoading] = useState(true); // State to track loading status

    // Dictionary to encode body part
    const bodyPartEncoding = {
        'torso': 0,
        'lower extremity': 1,
        'upper extremity': 2,
        'head/neck': 3,
        'palms/soles': 4,
        'oral/genital': 5
    };

    // State to store uploaded image and selected body part
    const [uploadedImage, setUploadedImage] = useState(null);
    const [bodyPart, setBodyPart] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const pgender = currentUser.sex;
    const page = currentUser.age;

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
                    setDoctorData(data);
                    setDtitle(data.name || 'Doctor');
                    setDimageSrc(data.image || dimageSrc);
                    setDdescription([
                        `ID - ${data.id}`,
                        `Gender - ${data.sex}`,
                        `Email - ${data.email}`,
                    ]);
                    console.log('Doctor data:', data);
                }
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [currentUser.doctor_id]);

    // Handle image upload and store it in Firebase
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const storage = getStorage(app);
            const storageRef = ref(storage, `${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe progress of the upload
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Upload failed:', error);
                    setIsUploading(false);
                },
                () => {
                    // Handle successful uploads
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setIsUploading(false); // Finish uploading
                        setUploadedImage(downloadURL); // Set the download URL to display the image
                    });
                }
            );
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

        const encodedBodyPart = bodyPartEncoding[bodyPart];

        const payload = {
            image: uploadedImage,
            sex: pgender === 'male' ? 0 : 1,
            age_approx: page,
            anatom_site_general_challenge: encodedBodyPart,
            image_url: uploadedImage,
            user_id: currentUser._id,
            doctor_id: currentUser.doctor_id,
            user_name: currentUser.name,
            doctor_name: doctorData.name,
            doctor_email: doctorData.email,
            user_profile: currentUser.profile,
            user_name: currentUser.name,
            user_email: currentUser.email,
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
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the prediction.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
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
                    <label className="mb-2 font-bold text-gray-700">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-4"
                    />
                    {isUploading && <div className='text-green-500'>Uploading image...</div>}



                    {uploadedImage && (
                        <img
                            src={uploadedImage}
                            alt="Uploaded Preview"
                            className="mb-4 border border-gray-300"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    )}

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

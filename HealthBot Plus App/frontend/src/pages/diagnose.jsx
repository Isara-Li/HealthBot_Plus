import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import PatientCard from "../components/patient_card";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Alert } from "@mui/material"; // Import MUI Alert

export default function Diagnose() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [submitting, setSubmitting] = useState(false);

  const ptitle = currentUser.name;
  const pimageSrc = currentUser.profile;
  const pdescription = [
    `ID - ${currentUser._id}`,
    `Gender - ${currentUser.sex}`,
    `Age - ${currentUser.age}`,
  ];

  const [doctorData, setDoctorData] = useState(null);
  const [dtitle, setDtitle] = useState("Dr. Fernando");
  const [dimageSrc, setDimageSrc] = useState(
    "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
  );
  const [ddescription, setDdescription] = useState([
    "ID - 12345",
    "Gender - Male",
    "Email - liyanageisara@gmail.com",
  ]);
  const [loading, setLoading] = useState(true);

  const bodyPartEncoding = {
    torso: 0,
    "lower extremity": 1,
    "upper extremity": 2,
    "head/neck": 3,
    "palms/soles": 4,
    "oral/genital": 5,
  };

  const [uploadedImage, setUploadedImage] = useState(null);
  const [bodyPart, setBodyPart] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [showReportAlert, setReportShowAlert] = useState(false);
  const pgender = currentUser.sex;
  const page = currentUser.age;

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          "https://essential-carin-isara-373532ad.koyeb.app/getdoctor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ doctor_id: currentUser.doctor_id }),
          }
        );

        const data = await response.json();
        if (data.error) {
          console.error("Error:", data.error);
        } else {
          setDoctorData(data);
          setDtitle(data.name || "Doctor");
          setDimageSrc(data.image || dimageSrc);
          setDdescription([
            `ID - ${data.id}`,
            `Gender - ${data.sex}`,
            `Email - ${data.email}`,
          ]);
          console.log("Doctor data:", data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [currentUser.doctor_id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setIsUploading(false);
            setUploadedImage(downloadURL);
          });
        }
      );
    }
  };

  const handleBodyPartChange = (e) => {
    setBodyPart(e.target.value);
  };

  const handleSubmit = async () => {
    if (!uploadedImage || !bodyPart) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    setSubmitting(true);

    const encodedBodyPart = bodyPartEncoding[bodyPart];
    const payload = {
      image: uploadedImage,
      sex: pgender === "male" ? 0 : 1,
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
      const response = await fetch(
        "https://essential-carin-isara-373532ad.koyeb.app/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (
        data.result == "Success" ||
        data.result == "Error in the Melanoma Model" ||
        data.result == "Error in the Disease Model"
      ) {
        setSubmitting(false);
        setReportShowAlert(true);
      } else {
        setSubmitting(false);

        console.log(data);
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error:", error);
      alert("An error occurred while making the prediction.");
    }
  };

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:px-11 sm:px-4 py-6 gap-6">
        {/* Patient Card */}
        <div className="flex-1 max-w-lg mx-auto">
          <PatientCard
            title={ptitle}
            imageSrc={pimageSrc}
            description={pdescription}
          />
        </div>

        {/* Doctor Card */}
        <div className="flex-1 max-w-lg mx-auto">
          <PatientCard
            title={dtitle}
            imageSrc={dimageSrc}
            description={ddescription}
          />
        </div>

        {/* Image Upload & Body Part Selection */}
        <div className="flex-1 max-w-lg mx-auto bg-gray-300 p-6 border border-gray-400 rounded-lg shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Upload Image */}
            <div>
              <label className="font-bold text-gray-700 mb-2 block">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isUploading && (
                <p className="text-green-500 mt-2">Uploading image...</p>
              )}
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded Preview"
                  className="mt-4 mx-auto border border-gray-300 rounded-lg max-w-xs"
                />
              )}
            </div>

            {/* Select Body Part */}
            <div>
              <label className="font-bold text-gray-700 mb-2 block">
                Select Body Part:
              </label>
              <select
                value={bodyPart}
                onChange={handleBodyPartChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">--Select--</option>
                <option value="upper extremity">Upper Extremity</option>
                <option value="lower extremity">Lower Extremity</option>
                <option value="torso">Torso</option>
                <option value="head/neck">Head/Neck</option>
                <option value="palms/soles">Palm/Soles</option>
                <option value="oral/genital">Oral/Genital</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-4">
              {submitting ? (
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center cursor-not-allowed"
                  disabled
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Generating Report...
                </button>
              ) : (
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>

            {/* Alerts */}
            {showReportAlert && (
              <Alert variant="filled" severity="success" className="mt-4">
                Report generated successfully.
              </Alert>
            )}

            {showAlert && (
              <Alert variant="outlined" severity="error" className="mt-4">
                Please upload an image and select a body part.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa"; // Import the chat icon
import Navbar from "../components/navbar"; // Import the Navbar component
import StatCard from "../components/statCard"; // Import the StatCard component
import { useSelector } from 'react-redux'
import { signInSuccess, signInFailure, deleteUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase'

const Patient = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const { currentUser } = useSelector(state => state.user); // get the user from the redux store

  useEffect(() => {
    fetchPatientData();
    fetchReportHistory();
  }, []);

  const fetchPatientData = async () => {
    const data = {
      id: currentUser._id,
      name: currentUser.name,
      age: currentUser.age,
      gender: currentUser.sex,
      contact: currentUser.email,
      profile: currentUser.profile
    };
    setPatientData(data);
  };

  const fetchReportHistory = async () => {
    const data = [
      {
        id: 1,
        date: "2024-08-20",
        investigation: "Cancer",
        status: "Reviewed",
        reviewedOn: "2024-08-22",
      },
      {
        id: 2,
        date: "2024-07-15",
        investigation: "Atopic Dermatitis",
        status: "Pending",
        reviewedOn: null,
      },
      {
        id: 3,
        date: "2023-06-10",
        investigation: "Benign Keratosis",
        status: "Reviewed",
        reviewedOn: "2023-06-12",
      },
      {
        id: 4,
        date: "2024-05-05",
        investigation: "Dermatofibroma",
        status: "Pending",
        reviewedOn: null,
      },
      {
        id: 5,
        date: "2023-04-01",
        investigation: "Actinic Keratosis",
        status: "Reviewed",
        reviewedOn: "2023-04-03",
      },
    ];
    setReports(data);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  const handlelogout = () => {
    dispatch(deleteUserSuccess());
    navigate('/');
  };

  const handleSaveChanges = async () => {
    let downloadURL = patientData.profile;

    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setFileUploadError(false);

      await new Promise((resolve, reject) => {
        setIsUploading(true);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progress));
          },
          (error) => {
            setFileUploadError(true);
            reject(error);
            setIsUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              downloadURL = url; // Store the download URL
              setIsUploading(false);
              resolve();
            });
          }
        );
      });
    }

    const updatedData = {
      id: currentUser._id,
      name: patientData.name,
      age: patientData.age,
      sex: patientData.gender,
      contact: patientData.contact,
      profile: downloadURL,
    };
    console.log(updatedData);
    try {
      const response = await fetch('http://localhost:5000/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setIsEditing(false);
        const result = await response.json();
        dispatch(signInSuccess(result)); // Update user in Redux store
      } else {
        console.error('Failed to update:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while updating:', error);
    }
  };

  const handleReportClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };
  console.log(currentUser.doctor_id);


  const totalReports = reports.length;
  const reviewedReports = reports.filter(
    (report) => report.status === "Reviewed"
  ).length;
  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  if (!patientData)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <div className="App">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-center space-x-6 mb-8">
          <StatCard title="Total Reports" value={totalReports} />
          <StatCard title="Reviewed Reports" value={reviewedReports} />
          <StatCard title="Pending Reports" value={pendingReports} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex justify-center">
          <div className="text-center">
            {isUploading && <div className='text-green-500 my-1'>Uploading image...</div>}
            {isEditing ? (

              <img
                src={currentUser.profile}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()} // Trigger file input on image click
              />
            ) : (
              <img
                src={currentUser.profile}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto cursor-pointer"
              />
            )}


            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="mt-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {currentUser.name}
              </h1>
              <p className="text-lg text-gray-600">
                Patient ID: {currentUser._id}
              </p>
              <p className="text-lg text-gray-600">Age: {currentUser.age}</p>
              <p className="text-lg text-gray-600">
                Gender: {currentUser.sex}
              </p>
              <p className="text-lg text-gray-600">
                Contact: {currentUser.email}
              </p>
              <div className="flex space-x-6">
                {isEditing ? (
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 w-60"
                    onClick={handleEditToggle}
                  >
                    Back
                  </button>) : (
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 w-60"
                    onClick={handleEditToggle}
                  >
                    Edit Personal Data
                  </button>)}

                <button
                  className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 w-60"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </div>

            </div>
          </div>

          {isEditing && (
            <div className="mt-8">
              <input
                type="text"
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={patientData.name}
                onChange={(e) =>
                  setPatientData({ ...patientData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="text"
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={patientData.age}
                onChange={(e) =>
                  setPatientData({ ...patientData, age: e.target.value })
                }
                placeholder="Age"
              />
              <input
                type="text"
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={patientData.gender}
                onChange={(e) =>
                  setPatientData({ ...patientData, gender: e.target.value })
                }
                placeholder="Gender"
              />
              <input
                type="text"
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={patientData.contact}
                onChange={(e) =>
                  setPatientData({ ...patientData, contact: e.target.value })
                }
                placeholder="Contact"
              />

              <div className="flex space-x-4 mt-4 items-center justify-center">
                <button
                  className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>

              </div>

            </div>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Report History
          </h2>
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Report ID
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Investigation
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Reviewed On
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-700">{report.id}</td>
                  <td className="p-3 text-sm text-gray-700">{report.date}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {report.investigation}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{report.status}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {report.reviewedOn || "N/A"}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleReportClick(report.id)}
                    >
                      View Full Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="fixed right-[55px] bottom-[45px] bg-blue-500 text-white text-sm font-semibold rounded-tl-xl p-2 flex items-center hover:bg-blue-700">
        <FaRocketchat size={14} style={{ color: "white" }} />
        <div className="w-2"></div> Want to chat?
      </button>
    </div>
  );
};

export default Patient;

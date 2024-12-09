import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa"; // Import the chat icon
import Navbar from "../components/navbar"; // Import the Navbar component
import StatCard from "../components/statCard"; // Import the StatCard component
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  signInSuccess,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import Footer from "../components/footer";

const Patient = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { currentUser } = useSelector((state) => state.user); // get the user from the redux store

  useEffect(() => {
    fetchPatientData();
    fetchReportHistory();
  }, [currentUser]);

  const fetchPatientData = async () => {
    if (currentUser) {
      const data = {
        id: currentUser._id,
        name: currentUser.name,
        age: currentUser.age,
        gender: currentUser.sex,
        contact: currentUser.email,
        profile: currentUser.profile,
      };
      setPatientData(data);
    }
  };

  const fetchReportHistory = async () => {
    try {
      const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/getreportsforpatient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      if (response.ok) {
        const result = await response.json();
        const data = JSON.parse(result.reports);
        setReports(data);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching report history:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to Sign Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserSuccess()); // Dispatch logout action
        navigate("/");
      }
    });
  };

  const handleSaveChanges = async () => {
    let downloadURL = patientData.profile;

    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        setIsUploading(true);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
          },
          (error) => {
            console.error("Upload error: ", error);
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

    try {
      const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(signInSuccess(result)); // Update user in Redux store
        setIsEditing(false); // Disable editing mode after saving changes
      } else {
        console.error("Failed to update:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while updating:", error);
    }
  };

  const totalReports = reports.length || 0;
  const reviewedReports = reports.filter((report) => report.status === "Reviewed").length;
  const pendingReports = reports.filter((report) => report.status === "Pending").length;

  if (!patientData) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        {/* Stat Cards Section */}
        <div className="flex flex-wrap justify-between mb-8">
          <StatCard title="Total Reports" value={totalReports} />
          <StatCard title="Reviewed Reports" value={reviewedReports} />
          <StatCard title="Pending Reports" value={pendingReports} />
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          {isUploading && <div className="text-green-500 my-1">Uploading image...</div>}
          <div className="text-center">
            <img
              src={currentUser.profile}
              alt="Profile"
              className="w-40 h-40 rounded-full border-2 border-gray-300 mx-auto mb-4 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <h1 className="text-2xl font-semibold text-gray-800">{currentUser.name}</h1>
            <p className="text-lg text-gray-600">Patient ID: {currentUser._id}</p>
            <p className="text-lg text-gray-600">Age: {patientData.age}</p>
            <p className="text-lg text-gray-600">Gender: {patientData.gender}</p>
            <p className="text-lg text-gray-600">Contact: {patientData.contact}</p>
          </div>

          {/* Edit profile inputs and buttons */}
          {isEditing && (
            <div className="mt-6">
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
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleEditToggle}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
            <button
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Report History Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Report History</h2>
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Report ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">Patient Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">Patient ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">Date</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">Status</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report._id.$oid} className={report.status === "Reviewed" ? "bg-green-100" : ""}>
                  <td className="p-3 text-sm text-gray-700">{report._id.$oid}</td>
                  <td className="p-3 text-sm text-gray-700 hidden sm:table-cell">{report.name}</td>
                  <td className="p-3 text-sm text-gray-700 hidden sm:table-cell">{report.patientId}</td>
                  <td className="p-3 text-sm text-gray-700 hidden sm:table-cell">{report.date}</td>
                  <td className="p-3 text-sm text-gray-700 hidden sm:table-cell">{report.status}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                      onClick={() => navigate(`/report/${report._id.$oid}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Patient;

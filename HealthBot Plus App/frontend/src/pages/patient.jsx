import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "../components/navbar_patientDashboard";
import StatCard from "../components/statCard";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import Footer from "../components/footer";
import { signInSuccess, deleteUserSuccess } from "../redux/user/userSlice";

const Patient = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchPatientData();
    fetchReportHistory();
  }, [currentUser]);

  const fetchPatientData = async () => {
    const data = {
      id: currentUser._id,
      name: currentUser.name,
      age: currentUser.age,
      gender: currentUser.sex,
      contact: currentUser.email,
      profile: currentUser.profile,
    };
    setPatientData(data);
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
    setIsEditing(!isEditing);
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
        dispatch(deleteUserSuccess());
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
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              downloadURL = url;
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
        setIsEditing(false);
        const result = await response.json();
        dispatch(signInSuccess(result));
      } else {
        console.error("Failed to update:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while updating:", error);
    }
  };

  const totalReports = reports.length;
  const reviewedReports = reports.filter((report) => report.status === "Reviewed").length;
  const pendingReports = reports.filter((report) => report.status === "Pending").length;

  if (!patientData) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <div className="max-w-7xl mx-auto  p-6 bg-gray-100 min-h-screen">
        {/* Stat Cards Section */}
        <div className="w-full flex flex-wrap justify-center space-x-4 mb-8">
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
            <StatCard title="Total Reports" value={totalReports} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
            <StatCard title="Reviewed Reports" value={reviewedReports} />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
            <StatCard title="Pending Reports" value={pendingReports} />
          </div>
        </div>

        {/* Profile Section */}
        <div className="text-center bg-white shadow-lg rounded-lg p-6 mb-8">
          {isUploading && <div className="text-green-500 my-1">Uploading image...</div>}
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
          <p className="text-lg text-gray-600">Age: {currentUser.age}</p>
          <p className="text-lg text-gray-600">Gender: {currentUser.sex}</p>
          <p className="text-lg text-gray-600">Contact: {currentUser.email}</p>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={isEditing ? handleSaveChanges : handleEditToggle}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Report ID</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Patient Name
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Patient ID
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Status
                  </th>
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
                        onClick={() => navigate(`/patient/report/${report._id.$oid}`)}
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
      </div>
      <Footer />
    </div>
  );
};

export default Patient;

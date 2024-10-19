import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa"; // Import the chat icon
import Navbar from "../components/navbar"; // Import the Navbar component
import StatCard from "../components/statCard"; // Import the StatCard component
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AudioRecorder from "../components/AudioRecorder";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import Footer from "../components/footer";

import { deleteUserSuccess } from "../redux/user/userSlice";

const Doctor = ({ productLogo }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const [correctPredictions, setCorrectPredictions] = useState(0);
  const [faultPredictions, setFaultPredictions] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);

  useEffect(() => {
    let timer;
    if (chatClicked) {
      timer = setTimeout(() => {
        setShowRecorder(true);
      }, 200);
    } else {
      setShowRecorder(false);
    }

    return () => clearTimeout(timer); // Cleanup timer if chatClicked changes before the timer completes
  }, [chatClicked]);

  useEffect(() => {
    fetchDoctorData();
    fetchReportHistory();
  }, []);

  const fetchDoctorData = async () => {
    const data = {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      age: currentUser.age,
      country: currentUser.country,
    };
    setDoctorData(data);
  };

  const fetchReportHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/getreports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });

      if (response.ok) {
        const result = await response.json();
        const data = JSON.parse(result.reports);
        setReports(data);
        console.log("Report history:", data);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching report history:", error);
    }
  };

  // Function to update report status to 'Reviewed'
  const updateReportStatus = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:5000/updatereportstatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId, status: "Reviewed", review_date: new Date().toLocaleDateString() }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id.$oid === reportId
              ? { ...report, status: "Reviewed" }
              : report
          )
        );
        window.location.reload();
      } else {
        console.error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  const handlelogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to Sign Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserSuccess()); // Dispatch logout action
        navigate("/");
      }
    });
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!doctorData)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-center space-x-6 mb-8">
          <StatCard title="Total Reports" value={reports.length} />
          <StatCard
            title="Reviewed Reports"
            value={
              reports.filter((report) => report.status === "Reviewed").length
            }
          />
          <StatCard
            title="Pending Reports"
            value={
              reports.filter((report) => report.status === "Pending").length
            }
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="text-center">
            <img
              src={currentUser.profile}
              alt="Profile"
              className="w-40 h-40 rounded-full border-2 border-gray-300 mx-auto cursor-pointer"
            />
            <div className="mt-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {doctorData.name}
              </h1>
              <p className="text-lg text-gray-600">
                Doctor ID: {doctorData.id}
              </p>
              <p className="text-lg text-gray-600">Email: {doctorData.email}</p>
              <p className="text-lg text-gray-600">Age: {doctorData.age}</p>
              <p className="text-lg text-gray-600">
                Country: {doctorData.country}
              </p>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 w-60"
                onClick={handlelogout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Report History
          </h2>
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-24">
                  Report ID
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Patient Name
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Patient ID
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Date
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-24">
                  Status
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-64">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report._id.$oid} className="doctor-table-row">
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report._id.$oid}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.user_name}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.user_id}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.date}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.status}
                  </td>
                  <td className="doctor-table-td p-3 flex items-center space-x-2">
                    <button
                      className="doctor-view-button bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => navigate(`/report/${report._id.$oid}`)}
                    >
                      Review Report
                    </button>
                    {report.status === "Pending" && (
                      <button
                        className="doctor-view-button bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        onClick={() => updateReportStatus(report._id.$oid)}
                      >
                        Mark as Reviewed
                      </button>
                    )}
                    {report.status === "Reviewed" && (
                      <button className="doctor-view-button bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
                        Reviewed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        onClick={() => setChatClicked(true)}
        className={`fixed right-[55px] bottom-[45px] bg-blue-500 text-white text-sm font-semibold rounded-tl-xl rounded-tr-xl rounded-bl-xl p-2 flex items-center hover:bg-blue-700 transition-all duration-1000 ease-in-out ${chatClicked ? "w-96 h-100" : "w-40 h-10 justify-center bg-blue-700"
          }`}
      >
        {chatClicked ? (
          <div className="flex flex-col items-start justify-center">
            <IoCloseCircleOutline
              size={25}
              style={{ padding: "1px", color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setChatClicked(false);
              }}
            />
            {showRecorder && <AudioRecorder />}
          </div>
        ) : (
          <>
            <FaRocketchat size={20} style={{ color: "white" }} />
            <div className="w-2"></div>
            <p>want to chat?</p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;

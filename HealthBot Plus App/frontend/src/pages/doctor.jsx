import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa"; // Import the chat icon
import Navbar from "../components/navbar"; // Import the Navbar component
import StatCard from "../components/statCard"; // Import the StatCard component
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";

import { deleteUserSuccess } from "../redux/user/userSlice";


const Doctor = ({ productLogo }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const [correctPredictions, setCorrectPredictions] = useState(0);
  const [faultPredictions, setFaultPredictions] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();



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
    const data = [
      {
        id: 1,
        patientName: "Binura Fernando",
        date: "2024-08-20",
        investigation: "Cancer",
        status: "Pending",
        modelPrediction: "Correct", // Can be "Correct" or "Fault"
      },
      {
        id: 2,
        patientName: "Binura Fernando",
        date: "2024-07-15",
        investigation: "Atopic Dermatitis",
        status: "Reviewed",
        modelPrediction: "Fault",
      },
      {
        id: 3,
        patientName: "Kusal Mendis",
        date: "2023-06-10",
        investigation: "Benign Keratosis",
        status: "Reviewed",
        modelPrediction: "Correct",
      },
      {
        id: 4,
        patientName: "Dimuth Karunarathne",
        date: "2024-05-05",
        investigation: "Dermatofibroma",
        status: "Pending",
        modelPrediction: "Fault",
      },
    ];
    setReports(data);
    updatePredictionCounts(data);
  };

  const updatePredictionCounts = (reports) => {
    const correct = reports.filter(
      (report) => report.modelPrediction === "Correct"
    ).length;
    const fault = reports.filter(
      (report) => report.modelPrediction === "Fault"
    ).length;
    setCorrectPredictions(correct);
    setFaultPredictions(fault);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handlelogout = () => {
    dispatch(deleteUserSuccess());
    navigate('/');
  };

  const handleReportClick = (reportId) => {
    navigate(`/doctor-review/${reportId}`);
  };

  const handleTogglePrediction = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? {
            ...report,
            modelPrediction:
              report.modelPrediction === "Correct" ? "Fault" : "Correct",
          }
          : report
      )
    );
    updatePredictionCounts(
      reports.map((report) =>
        report.id === reportId
          ? {
            ...report,
            modelPrediction:
              report.modelPrediction === "Correct" ? "Fault" : "Correct",
          }
          : report
      )
    );
  };

  const handleMarkAsReviewed = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "Reviewed" } : report
      )
    );
  };

  const handleMarkAsPending = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "Pending" } : report
      )
    );
  };

  const totalReports = reports.length;
  const reviewedReports = reports.filter(
    (report) => report.status === "Reviewed"
  ).length;
  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  if (!doctorData)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <Navbar /> {/* Include Navbar component */}
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-center space-x-6 mb-8">
          <StatCard title="Total Reports" value={totalReports} />
          <StatCard title="Reviewed Reports" value={reviewedReports} />
          <StatCard title="Pending Reports" value={pendingReports} />
          <StatCard
            title="Correct Model Predictions"
            value={correctPredictions}
          />
          <StatCard title="Fault Model Predictions" value={faultPredictions} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="text-center">
            <img
              src={currentUser.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto"
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
              <p className="text-lg text-gray-600">Country: {doctorData.country}</p>

              <button
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 w-60"
                onClick={handlelogout}
              >
                Logout
              </button>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8">
              <input
                type="text"
                className="doctor-input mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={doctorData.name}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="text"
                className="doctor-input mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={doctorData.specialization}
                onChange={(e) =>
                  setDoctorData({
                    ...doctorData,
                    specialization: e.target.value,
                  })
                }
                placeholder="Specialization"
              />
              <input
                type="text"
                className="doctor-input mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={doctorData.contact}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, contact: e.target.value })
                }
                placeholder="Contact"
              />
              <input
                type="email"
                className="doctor-input mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={doctorData.email}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="text"
                className="doctor-input mb-4 p-3 border border-gray-300 rounded-lg w-full"
                value={doctorData.address}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, address: e.target.value })
                }
                placeholder="Address"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
                  onClick={handleEditToggle}
                >
                  Cancel
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
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-24">
                  Report ID
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Patient Name
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Date
                </th>
                <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32">
                  Investigation
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
                <tr key={report.id} className="doctor-table-row">
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.id}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.patientName}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.date}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.investigation}
                  </td>
                  <td className="doctor-table-td p-3 text-sm text-gray-700">
                    {report.status}
                  </td>
                  <td className="doctor-table-td p-3 flex items-center space-x-2">
                    <button
                      className="doctor-view-button bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleReportClick(report.id)}
                    >
                      Review Report
                    </button>
                    {report.status === "Pending" && (
                      <button
                        className="doctor-view-button bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        onClick={() => handleMarkAsReviewed(report.id)}
                      >
                        Mark as Reviewed
                      </button>
                    )}
                    {report.status === "Reviewed" && (
                      <button
                        className="doctor-view-button bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                        onClick={() => handleMarkAsPending(report.id)}
                      >
                        Mark as Pending
                      </button>
                    )}
                    <button
                      className={`doctor-set-button ${report.modelPrediction === "Correct"
                        ? "bg-purple-500"
                        : "bg-red-500"
                        } text-white py-1 px-4 rounded-md hover:${report.modelPrediction === "Correct"
                          ? "bg-purple-600"
                          : "bg-red-600"
                        } transition duration-300`}
                      onClick={() => handleTogglePrediction(report.id)}
                    >
                      {report.modelPrediction === "Correct"
                        ? "Correct Model Prediction"
                        : "Fault Model Prediction"}
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

export default Doctor;

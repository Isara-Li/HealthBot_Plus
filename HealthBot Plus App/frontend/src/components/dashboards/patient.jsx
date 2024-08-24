import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../tailwind.css"; // Import the Tailwind CSS file

const Patient = ({ productLogo }) => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientData();
    fetchReportHistory();
  }, []);

  const fetchPatientData = async () => {
    const data = {
      id: "12345",
      name: "John Doe",
      age: 45,
      gender: "Male",
      contact: "+1234567890",
      address: "123 Main St, City, ZIP",
      profilePhoto: "https://via.placeholder.com/150",
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

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleReportClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };

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
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <img
          src={"/images/SkinVision-Logo.png"}
          alt="Product Logo"
          className="w-32 h-auto"
        />
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-3xl font-bold text-gray-800">{totalReports}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Reviewed Reports</p>
            <p className="text-3xl font-bold text-gray-800">
              {reviewedReports}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Pending Reports</p>
            <p className="text-3xl font-bold text-gray-800">{pendingReports}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src={patientData.profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {patientData.name}
            </h1>
            <p className="text-lg text-gray-600">
              Patient ID: {patientData.id}
            </p>
            <p className="text-lg text-gray-600">Age: {patientData.age}</p>
            <p className="text-lg text-gray-600">
              Gender: {patientData.gender}
            </p>
            <p className="text-lg text-gray-600">
              Contact: {patientData.contact}
            </p>
            <p className="text-lg text-gray-600">
              Address: {patientData.address}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleEditToggle}
            >
              Edit Personal Data
            </button>
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
            <input
              type="text"
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full"
              value={patientData.address}
              onChange={(e) =>
                setPatientData({ ...patientData, address: e.target.value })
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
  );
};

export default Patient;

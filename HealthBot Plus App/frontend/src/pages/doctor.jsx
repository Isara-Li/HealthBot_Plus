import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ productLogo }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorData();
    fetchReportHistory();
  }, []);

  const fetchDoctorData = async () => {
    const data = {
      id: "D12345",
      name: "Dr. Jane Smith",
      specialization: "Dermatology",
      contact: "+1234567890",
      email: "jane.smith@hospital.com",
      address: "456 Medical St, City, ZIP",
      profilePhoto: "https://via.placeholder.com/150",
    };
    setDoctorData(data);
  };

  const fetchReportHistory = async () => {
    const data = [
      {
        id: 1,
        patientName: "John Doe",
        date: "2024-08-20",
        investigation: "Cancer",
        status: "Pending",
      },
      {
        id: 2,
        patientName: "Jane Doe",
        date: "2024-07-15",
        investigation: "Atopic Dermatitis",
        status: "Reviewed",
      },
      {
        id: 3,
        patientName: "Alice Johnson",
        date: "2023-06-10",
        investigation: "Benign Keratosis",
        status: "Reviewed",
      },
      {
        id: 4,
        patientName: "Bob Brown",
        date: "2024-05-05",
        investigation: "Dermatofibroma",
        status: "Pending",
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
    navigate(`/doctor-review/${reportId}`);
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
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <img
          src={"/images/SkinVision-Logo.png"}
          alt="Product Logo"
          className="w-32 h-auto"
        />
        <div className="flex space-x-6">
          <div className="doctor-stat-item text-center">
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-3xl font-bold text-gray-800">{totalReports}</p>
          </div>
          <div className="doctor-stat-item text-center">
            <p className="text-sm text-gray-600">Reviewed Reports</p>
            <p className="text-3xl font-bold text-gray-800">
              {reviewedReports}
            </p>
          </div>
          <div className="doctor-stat-item text-center">
            <p className="text-sm text-gray-600">Pending Reports</p>
            <p className="text-3xl font-bold text-gray-800">{pendingReports}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src={doctorData.profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {doctorData.name}
            </h1>
            <p className="text-lg text-gray-600">Doctor ID: {doctorData.id}</p>
            <p className="text-lg text-gray-600">
              Specialization: {doctorData.specialization}
            </p>
            <p className="text-lg text-gray-600">
              Contact: {doctorData.contact}
            </p>
            <p className="text-lg text-gray-600">Email: {doctorData.email}</p>
            <p className="text-lg text-gray-600">
              Address: {doctorData.address}
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
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
                Report ID
              </th>
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
                Patient Name
              </th>
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
                Investigation
              </th>
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600">
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
                <td className="doctor-table-td p-3 flex space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctor;

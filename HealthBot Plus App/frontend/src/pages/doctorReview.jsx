import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../tailwind.css"; // Import Tailwind CSS

const DoctorReview = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState("");

  useEffect(() => {
    const fetchReportDetails = async () => {
      // Mock report data - replace this with an actual API call in production
      const data = {
        id: reportId,
        patientName: "John Doe",
        date: "2024-08-20",
        investigation: "Cancer",
        status: "Pending",
        details: "Initial diagnosis shows potential malignant melanoma...",
      };
      setReport(data);
      setUpdatedDetails(data.details);
    };

    fetchReportDetails();
  }, [reportId]);

  const handleSaveChanges = () => {
    // Mock saving logic - replace with actual API call
    setReport((prevReport) => ({
      ...prevReport,
      status: "Reviewed",
      details: updatedDetails,
    }));
    setIsEditing(false);
  };

  const handleBackClick = () => {
    navigate("/doctor");
  };

  if (!report)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <img
          src={"/images/SkinVision-Logo.png"}
          alt="Product Logo"
          className="w-32 h-auto"
        />
        <button
          className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
          onClick={handleBackClick}
        >
          Back to Dashboard
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Review Report
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg mb-4">
          <strong>Report ID:</strong> {report.id}
        </p>
        <p className="text-lg mb-4">
          <strong>Patient Name:</strong> {report.patientName}
        </p>
        <p className="text-lg mb-4">
          <strong>Date:</strong> {report.date}
        </p>
        <p className="text-lg mb-4">
          <strong>Investigation:</strong> {report.investigation}
        </p>
        <p className="text-lg mb-4">
          <strong>Status:</strong> {report.status}
        </p>
        <p className="text-lg mb-2">
          <strong>Details:</strong>
        </p>
        {isEditing ? (
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={updatedDetails}
            onChange={(e) => setUpdatedDetails(e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-4 rounded-lg">
            {report.details}
          </p>
        )}
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => setIsEditing(true)}
            >
              Edit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorReview;

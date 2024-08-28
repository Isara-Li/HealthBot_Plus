import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocketchat } from "react-icons/fa"; // Import the chat icon
import "../tailwind.css";

const DoctorReview = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [updatedFeedback, setUpdatedFeedback] = useState("");
  const [limeImage, setLimeImage] = useState("/images/Lime.jpg"); // Default LIME output image

  // Array of report objects with unique details and feedback
  const reportsData = [
    {
      id: 1,
      patientName: "Binura Fernando",
      date: "2024-08-20",
      investigation: "Cancer",
      status: "Pending",
      modelProbability: 0.85,
      details:
        "The model predicts the presence of malignant melanoma with a probability of 0.85. The prediction is based on the features highlighted in the image below.",
      feedback:
        "This report investigates the presence of cancerous cells in the biopsy taken from the patient's skin. The pathology results indicate the presence of malignant melanoma. The lesion was excised, and margins were checked for clearance. Immunohistochemical staining confirmed the diagnosis, with markers such as S-100, HMB-45, and Melan-A showing positive results. The tumor thickness was measured at 1.2 mm, placing it in the intermediate risk category according to the Breslow scale.",
    },
    {
      id: 2,
      patientName: "Binura Fernando",
      date: "2024-07-15",
      investigation: "Atopic Dermatitis",
      status: "Reviewed",
      modelProbability: 0.45,
      details:
        "The model predicts the presence of atopic dermatitis with a probability of 0.45. The prediction is based on the features highlighted in the image below.",
      feedback:
        "This report covers the examination of a skin sample to assess chronic inflammatory conditions. The clinical presentation, characterized by red, itchy patches, is consistent with Atopic Dermatitis. Histopathological examination revealed epidermal spongiosis, hyperkeratosis, and infiltration of lymphocytes and eosinophils. There is no evidence of bacterial or fungal superinfection. Treatment with topical corticosteroids and moisturizers is recommended, along with avoiding known allergens.",
    },
    {
      id: 3,
      patientName: "Somasiri Medagedara",
      date: "2023-06-10",
      investigation: "Benign Keratosis",
      status: "Reviewed",
      modelProbability: 0.92,
      details:
        "The model predicts the presence of benign keratosis with a probability of 0.92. The prediction is based on the features highlighted in the image below.",
      feedback: "No immediate action required. Monitor for any changes.",
    },
    {
      id: 4,
      patientName: "Dimuth Karunarathne",
      date: "2024-05-05",
      investigation: "Dermatofibroma",
      status: "Pending",
      modelProbability: 0.78,
      details:
        "The model predicts the presence of dermatofibroma with a probability of 0.78. The prediction is based on the features highlighted in the image below.",
      // No feedback provided, will show the default message
    },
  ];

  useEffect(() => {
    const fetchReportDetails = async () => {
      // Find the report that matches the reportId
      const reportDetails = reportsData.find(
        (report) => report.id === parseInt(reportId)
      );

      if (reportDetails) {
        setReport(reportDetails);
        setUpdatedFeedback(reportDetails.feedback || "No feedback provided.");
      } else {
        // Handle case where reportId does not match any report
        setReport(null);
      }
    };

    fetchReportDetails();
  }, [reportId]);

  const handleSaveFeedback = () => {
    // Mock saving logic - replace with actual API call
    setReport((prevReport) => ({
      ...prevReport,
      feedback: updatedFeedback,
    }));
    setIsEditingFeedback(false);
  };

  const handleBackClick = () => {
    navigate("/doctor");
  };

  if (!report)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <img
          src="/images/HealthBot+.PNG"
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

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Medical Report
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
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
          <strong>Model Prediction:</strong>
        </p>
        <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-4 rounded-lg mb-4">
          {report.details}
        </p>
        <div className="mb-4">
          <img
            src={limeImage}
            alt="LIME Output"
            className="w-full h-auto max-w-full max-h-[500px] object-contain border border-gray-300 rounded-lg"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Doctor's Feedback
        </h2>
        {isEditingFeedback ? (
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-justify"
            value={updatedFeedback}
            onChange={(e) => setUpdatedFeedback(e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-4 rounded-lg text-justify">
            {report.feedback || "No feedback provided."}
          </p>
        )}
        <div className="mt-6 flex space-x-4">
          {isEditingFeedback ? (
            <>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                onClick={handleSaveFeedback}
              >
                Save Feedback
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setIsEditingFeedback(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => setIsEditingFeedback(true)}
            >
              Edit Feedback
            </button>
          )}
        </div>
      </div>
      <button className="fixed right-[55px] bottom-[45px] bg-blue-500 text-white text-sm font-semibold rounded-tl-xl p-2 flex items-center hover:bg-blue-700">
        <FaRocketchat size={14} style={{ color: "white" }} />
        <div className="w-2"></div> Want to chat?
      </button>
    </motion.div>
  );
};

export default DoctorReview;

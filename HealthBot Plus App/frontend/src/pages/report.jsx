import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../tailwind.css";

const Report = () => {
  const { reportId } = useParams();  // Extract reportId from the URL
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getreport/${reportId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const reportData = await response.json();
          console.log("Report data:", reportData);
          setReport(reportData);  // Set the report data in state
        } else {
          console.error("Failed to fetch report details");
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReportDetails();
  }, [reportId]);


  if (!report)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white min-h-screen"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center mb-8">
        <img
          src={"/images/HealthBot+.PNG"}
          alt="Product Logo"
          className="w-41 h-auto align-middle"
        />

      </div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-semibold text-center text-gray-800 rounded-lg mb-6 bg-gray-100 p-4 border border-gray-300 inline-block">
          Medical Report
        </h1>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-lg p-6">
        <p className="text-lg mb-4">
          <strong>Report ID:</strong> {report._id}
        </p>
        <p className="text-lg mb-4">
          <strong>Date:</strong> {report.date}
        </p>

        <p className="text-lg mb-4">
          <strong>Status:</strong> {report.status}
        </p>
        <p className="text-lg mb-4">
          <strong>Reviewed On:</strong> {report.reviewedOn || "N/A"}
        </p>


      </div>

      <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-left my-8">Patient Details</h1>
          <p className="text-lg mb-4">
            <strong>Patient ID:</strong> {report.user_id}
          </p>
          <p className="text-lg mb-4">
            <strong>Patient Name:</strong> {report.user_name}
          </p>

          <p className="text-lg mb-4">
            <strong>Email:</strong> {report.user_email}
          </p>
          <p className="text-lg mb-4">
            <strong>Age:</strong> {report.age}
          </p>
          <p className="text-lg mb-4">
            <strong>Gender:</strong> {report.sex}
          </p>
        </div>

        {/* Image section */}
        <div className="ml-8">
          <img
            src={report.user_profile}  // Replace with the image source
            alt="Patient Profile"
            className="w-32 h-32 object-cover box-full rounded-lg"
          />
        </div>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8">
        <h1 className="text-2xl font-semibold text-left my-8">Doctor Details</h1>
        <p className="text-lg mb-4">
          <strong>Doctor ID:</strong> {report.doctor_id}
        </p>
        <p className="text-lg mb-4">
          <strong>Doctor Name:</strong> {report.doctor_name}
        </p>

        <p className="text-lg mb-4">
          <strong>Email:</strong> {report.doctor_email}
        </p>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-left my-8">Patient Submission</h1>
          <p className="text-lg mb-4">
            <strong>General Sight:</strong> {report.
              anatom_site_general_challenge}
          </p>
        </div>

        {/* Image section */}
        <div className="ml-8">
          <img
            src={report.image}  // Replace with the image source
            alt="Patient Profile"
            className="w-42 h-32 object-cover box-full rounded-lg"
          />
        </div>
      </div>

      {
        report.is_melanoma === "Yes" ? (
          <div>

          </div>
        ) : (
          <div>

          </div>
        )
      }

    </motion.div>
  );
};

export default Report;

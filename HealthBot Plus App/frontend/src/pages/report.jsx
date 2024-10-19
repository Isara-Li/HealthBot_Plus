import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../tailwind.css";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Report = () => {
  const { reportId } = useParams(); // Extract reportId from the URL
  const [report, setReport] = useState(null);
  const [doctorComment, setDoctorComment] = useState(""); // State to manage doctor comments
  const [comment, setComment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [showButton, setShowButton] = useState(false);


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
          setReport(reportData); // Set the report data in state
          setDoctorComment(reportData.doctor_comment || ""); // Set initial comment in state
        } else {
          console.error("Failed to fetch report details");
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReportDetails();
  }, [reportId]);

  useEffect(() => {
    // Show the back-to-top button only when the user scrolls down
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle posting the updated doctor's comment
  const handlePostComment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updatereport/${report._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_comment: doctorComment }), // Send the updated comment to the backend
      });

      if (response.ok) {
        setComment(true);
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handlePrediction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updatereportaccuracy/${report._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_accuracy: "False Prediction"
        }),
      });

      if (response.ok) {
        setIsDisabled(true);
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (!report) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white min-h-screen"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center mb-8">
        <img src={"/images/HealthBot+.PNG"} alt="Product Logo" className="w-41 h-auto align-middle" />
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
            src={report.user_profile} // Replace with the image source
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
            <strong>General Sight:</strong> {report.anatom_site_general_challenge}
          </p>
        </div>

        {/* Image section */}
        <img
          src={report.image}
          alt="Explanation Image 1"
          className="w-60 h-32 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-125"
          onClick={() => window.open(report.image, "_blank")}
        />
      </div>
      {currentUser.is_patient === false ? (
        report.is_melanoma === "Yes" ? (
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-left my-8">Model Prediction</h1>
              <p className="text-lg mb-4">
                <strong>Melanoma Probability: </strong>
                <span className="text-red-500 font-bold">{(report.melanoma_probability * 100).toFixed(2)}%</span>
              </p>
            </div>

            {/* Image section */}
            <div className="ml-8 flex space-x-4">
              <img
                src={report.xai_image_1}
                alt="Explanation Image 1"
                className="w-60 h-32 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => window.open(report.xai_image_1, "_blank")}
              />
              <img
                src={report.xai_image_2}
                alt="Explanation Image 2"
                className="w-60 h-32 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => window.open(report.xai_image_2, "_blank")}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-left my-8">Model Prediction</h1>
              <p className="text-lg mb-4">
                <strong>Disease Class: </strong>
                <span className="text-red-500 font-bold">{report.disease_class}</span>
              </p>
              {report.disease_probability > 0.5 && (
                <p className="text-lg mb-4">
                  <strong>Disease Probability: </strong>
                  <span className="text-red-500 font-bold">{(report.disease_probability * 100).toFixed(2)}%</span>
                </p>
              )}
            </div>

            <div className="ml-8 flex space-x-4">
              <img
                src={report.xai_image_1}
                alt="Explanation Image 1"
                className="w-60 h-32 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => window.open(report.xai_image_1, "_blank")}
              />
              <img
                src={report.xai_image_2}
                alt="Explanation Image 2"
                className="w-60 h-32 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => window.open(report.xai_image_2, "_blank")}
              />
            </div>
          </div>
        )
      ) : null}

      <div className="bg-gray-100 shadow-lg rounded-lg p-6 my-8">
        <h1 className="text-2xl font-semibold text-left my-8">Doctor's Review</h1>

        {currentUser.is_patient === false ? (
          <>
            <p className="text-lg mb-4">
              <strong>Doctor's Comments:</strong> {report.doctor_comment}
            </p>

            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={doctorComment}
              onChange={(e) => setDoctorComment(e.target.value)} // Update the state on change
              placeholder="Write your comment here..."
              rows="4"
            />

            <div className="ml-8 flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handlePostComment} // Function to post the comment
              >
                Post Comment
              </button>

              <button
                className={`py-2 px-6 rounded-md transition duration-300 ${isDisabled || report.model_accuracy !== "Undefined"
                  ? "bg-gray-500"
                  : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                onClick={handlePrediction}
                disabled={isDisabled || report.model_accuracy !== "Undefined"}
              >
                False Model Prediction
              </button>
            </div>

            {comment && <p className="text-green-500 py-2">Comment posted successfully!</p>}
          </>
        ) : <p className="text-lg mb-4">
          <strong>Doctor's Comments:</strong> {report.doctor_comment}
        </p>}
      </div>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-all w-12 h-12 flex justify-center items-center"
        >
          <KeyboardArrowUpIcon />
        </button>
      )}

    </motion.div>
  );
};

export default Report;

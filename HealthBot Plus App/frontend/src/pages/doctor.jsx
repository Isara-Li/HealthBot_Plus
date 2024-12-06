import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";
import StatCard from "../components/statCard";
import { useSelector, useDispatch } from "react-redux";
import AudioRecorder from "../components/AudioRecorder";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { deleteUserSuccess } from "../redux/user/userSlice";

const Doctor = ({ productLogo }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [chatClicked, setChatClicked] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);

  useEffect(() => {
    fetchDoctorData();
    fetchReportHistory();
  }, []);

  useEffect(() => {
    let timer;
    if (chatClicked) {
      timer = setTimeout(() => {
        setShowRecorder(true);
      }, 200);
    } else {
      setShowRecorder(false);
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [chatClicked]);

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
      const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/getreports", {
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

  const updateReportStatus = async (reportId, status) => {
    try {
      const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/updatereportstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId, status, review_date: new Date().toLocaleDateString() }),
      });

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id.$oid === reportId ? { ...report, status } : report
          )
        );
      } else {
        console.error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserSuccess()); // Dispatch logout action
        navigate("/");
      }
    });
  };

  if (!doctorData) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="App">
      <div className="App">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row justify-center md:space-x-6 mb-8">
          <StatCard title="Total Reports" value={reports.length} />
          <StatCard
            title="Reviewed Reports"
            value={reports.filter((report) => report.status === "Reviewed").length}
          />
          <StatCard
            title="Pending Reports"
            value={reports.filter((report) => report.status === "Pending").length}
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
              <h1 className="text-2xl font-semibold text-gray-800">{doctorData.name}</h1>
              <p className="text-lg text-gray-600">Doctor ID: {doctorData.id}</p>
              <p className="text-lg text-gray-600">Email: {doctorData.email}</p>
              <p className="text-lg text-gray-600">Age: {doctorData.age}</p>
              <p className="text-lg text-gray-600">Country: {doctorData.country}</p>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 w-60"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Report History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32 hidden sm:table-cell">
                    Patient Name
                  </th>
                  <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32 sm:table-cell">
                    Patient ID
                  </th>
                  <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-32 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-24 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="doctor-table-th p-3 text-left text-sm font-semibold text-gray-600 w-64">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr
                    key={report._id.$oid}
                    className={`doctor-table-row ${report.status === "Reviewed" ? "bg-green-100" : ""}`}
                  >
                    <td className="doctor-table-td p-3 text-sm text-gray-700 hidden sm:table-cell">
                      {report.user_name}
                    </td>
                    <td className="doctor-table-td p-3 text-sm text-gray-700 sm:table-cell">
                      {report.user_id}
                    </td>
                    <td className="doctor-table-td p-3 text-sm text-gray-700 hidden sm:table-cell">
                      {report.date}
                    </td>
                    <td className="doctor-table-td p-3 text-sm text-gray-700 hidden sm:table-cell">
                      {report.status}
                    </td>
                    <td className="doctor-table-td p-3 flex justify-between items-center space-x-2">
                      <button
                        className="doctor-view-button bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate(`/report/${report._id.$oid}`)}
                      >
                        Review Report
                      </button>
                      <button
                        className={`doctor-view-button ${report.status === "Pending" ? "bg-green-500" : "bg-yellow-500"
                          } text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300 hidden sm:block`}
                        onClick={() =>
                          updateReportStatus(report._id.$oid, report.status === "Pending" ? "Reviewed" : "Pending")
                        }
                      >
                        {report.status === "Pending" ? "Mark as Reviewed" : "Mark as Pending"}
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

export default Doctor;

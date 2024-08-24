import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import LoginSignup from "./pages/login_signup";
import Signup from "./pages/signup";
import Home from "./pages/Home.jsx";

import Patient from "./components/dashboards/patient";
import Report from "./pages/report";
import Doctor from "./components/dashboards/doctor";
import DoctorReview from "./pages/doctorReview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_signup" element={<LoginSignup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/patient" element={<Patient />} /> {/* Updated */}
        <Route path="/report/:reportId" element={<Report />} /> {/* Updated */}
        <Route path="/doctor" element={<Doctor />} /> {/* Doctor dashboard */}
        <Route
          path="/doctor-review/:reportId"
          element={<DoctorReview />}
        />{" "}
        {/* Doctor review */}
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import LoginSignup from "./pages/login_signup";
import Signup from "./pages/signup";
import Home from "./pages/Home.jsx";
import Patient from "./pages/patient.jsx";
import Report from "./pages/report";
import Doctor from "./pages/doctor.jsx";
import DoctorReview from "./pages/doctorReview";
import Login from "./pages/login";
import Diagnose from "./pages/diagnose";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_signup" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient/:patientId" element={<Patient />} />
        <Route path="/report/:reportId" element={<Report />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor-review/:reportId" element={<DoctorReview />} />
        <Route path="/diagnose" element={<Diagnose />} />
      </Routes>
    </Router>
  );
}

export default App;

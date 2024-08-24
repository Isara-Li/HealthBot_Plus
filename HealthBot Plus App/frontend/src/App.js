import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import LoginSignup from "./pages/login_signup";
import Signup from "./pages/signup";
import Home from "./pages/Home.jsx";
import Patient from "./components/dashboards/patient";
import Report from "./pages/report";
import Doctor from "./components/dashboards/doctor";
import DoctorReview from "./pages/doctorReview";
import Login from "./pages/login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_signup" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/report/:reportId" element={<Report />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor-review/:reportId" element={<DoctorReview />} />
      </Routes>
    </Router>
  );
}

export default App;

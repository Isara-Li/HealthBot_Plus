import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import Navbar from "./components/navbar";
import LoginSignup from "./pages/login_signup";
import Signup from "./pages/signup";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login_signup" element={<LoginSignup />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

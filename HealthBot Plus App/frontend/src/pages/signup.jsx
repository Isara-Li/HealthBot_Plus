import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";

import { signInSuccess, signInFailure } from "../redux/user/userSlice";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    birthday: "",
    sex: "",
    description: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle next step
  const handleNextStep = () => {
    setTransitionStage("fadeOut");
    setTimeout(() => {
      setStep(step + 1);
      setTransitionStage("fadeIn");
    }, 300);
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setTransitionStage("fadeOut");
    setTimeout(() => {
      setStep(step - 1);
      setTransitionStage("fadeIn");
    }, 300);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Sending data to the backend using fetch API
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Result fron page 2:", result);
      if (result.status === 'Ok') {
        console.log("User signed up successfully:", result.user);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <motion.div
        className="flex items-center justify-end h-screen w-screen bg-cover bg-center pr-60"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundImage: "url('/images/signup_background.jpg')" }}
      >
        <div
          className={`bg-white p-6 rounded-xl shadow-lg max-w-xs w-1/2 transform transition-opacity duration-300 ${transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
            }`}
        >
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                Enter Your Details
              </h2>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your country"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 opacity-75"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 opacity-75"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                Create Account
              </h2>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

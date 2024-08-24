import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  const handleNextStep = () => {
    setTransitionStage("fadeOut");
    setTimeout(() => {
      setStep(step + 1);
      setTransitionStage("fadeIn");
    }, 300);
  };

  const handlePreviousStep = () => {
    setTransitionStage("fadeOut");
    setTimeout(() => {
      setStep(step - 1);
      setTransitionStage("fadeIn");
    }, 300);
  };

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-cover bg-center pr-60"
      style={{ backgroundImage: "url('/images/signup_background.jpg')" }}
    >
      <div
        className={`bg-white p-8 rounded-xl shadow-lg max-w-md w-full transform transition-opacity duration-300 ${
          transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
        }`}
      >
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Enter Your Details
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your country"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Birthday</label>
              <input
                type="date"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Sex</label>
              <select className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Description</label>
              <textarea
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                className="flex items-center justify-center w-12 h-12 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Create Account
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousStep}
                className="flex items-center justify-center w-12 h-12 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;

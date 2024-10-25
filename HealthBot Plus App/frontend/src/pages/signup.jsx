import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const navigate = useNavigate();

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
    doctor: "",
  });

  // State to store errors
  const [errors, setErrors] = useState({});

  // Update form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation function for step 1
  const validateStep1 = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Birthday validation
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else {
      const birthdayDate = new Date(formData.birthday);
      const today = new Date();
      if (birthdayDate > today) {
        newErrors.birthday = "Birthday cannot be in the future";
      }
    }

    // Sex validation
    if (!formData.sex) {
      newErrors.sex = "Please select your gender";
    }

    // Description validation
    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Validation function for step 2
  const validateStep2 = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Doctor selection validation
    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setTransitionStage("fadeOut");
      setTimeout(() => {
        setStep(step + 1);
        setTransitionStage("fadeIn");
      }, 300);
    }
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
    if (validateStep2()) {
      // Sending data to the backend using fetch API
      try {
        const response = await fetch("https://essential-carin-isara-373532ad.koyeb.app/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.status === "Ok") {
          console.log("User signed up successfully:", result.user);
          navigate("/");
        } else {
          console.log("Signup failed:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
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
                {errors.birthday && (
                  <p className="text-red-500 text-xs">{errors.birthday}</p>
                )}
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
                {errors.sex && (
                  <p className="text-red-500 text-xs">{errors.sex}</p>
                )}
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
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
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
                <label className="block text-gray-700 text-sm">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Doctor Selection Dropdown */}
              <div className="mb-5">
                <label className="block text-gray-700 text-sm">Select Doctor</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select Doctor --</option>
                  <option value="Dr. Athula">Dr. Athula</option>
                </select>
                {errors.doctor && (
                  <p className="text-red-500 text-xs">{errors.doctor}</p>
                )}
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

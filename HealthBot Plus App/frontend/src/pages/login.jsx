import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";

const Login = () => {
  // State to store form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      // Parse the JSON response
      const result = await response.json();

      if (response.ok) {
        // If the login is successful, dispatch the user data
        dispatch(signInSuccess(result));
        console.log("User signed in successfully:", result);
      } else {
        dispatch(signInFailure(result.message));
        console.log("Login failed:", result.message);
      }
    } catch (error) {

      console.error("Error:", error);
      dispatch(signInFailure("An error occurred while logging in."));
    }
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <motion.div
        className="flex items-center justify-end h-screen w-screen bg-cover pr-60"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundImage: "url('/images/login_background.jpg')" }}
      >
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-1/2">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
            Log In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
            >
              Log In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

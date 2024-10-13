import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const Login = () => {
  // State to store form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false); // State to show/hide Code input field
  const [code, setCode] = useState(""); // State for the "Code" input field
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // State for confirming new password
  const [showPasswordReset, setShowPasswordReset] = useState(false); // State to show/hide password reset fields
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      const result = await response.json();

      if (response.ok) {
        // If the login is successful, dispatch the user data
        dispatch(signInSuccess(result));
        console.log("User signed in successfully:", result);
        if (result.is_patient) {
          navigate('/');
        } else {
          navigate(`/doctor/${result._id}`);
        }
      } else {
        dispatch(signInFailure(result.message));
        console.log("Login failed:", result.message);
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(signInFailure("An error occurred while logging in."));
    }
  };

  // Handler for forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (response.ok && result.message === "email sent") {
        setErrorMessage("Reset password link has been sent to your email.");
        setShowCodeInput(true); // Show the "Code" input field if email was sent
      } else {
        setErrorMessage(result.message);
        setShowCodeInput(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the reset password request.");
      setShowCodeInput(false);
    }
  };

  // Handler for verifying the code
  const handleVerifyCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code })
      });

      const result = await response.json();
      if (response.ok && result.message === "success") {
        setShowCodeInput(false);
        setShowPasswordReset(true);
        setErrorMessage("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while verifying the code.");
    }
  };

  // Handler for resetting the password
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reset-password-final", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword })
      });

      const result = await response.json();
      if (response.ok && result.message === "success") {
        setErrorMessage("Password has been reset successfully. Redirecting to the homepage...");
        setShowPasswordReset(false);
        navigate('/');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while resetting the password.");
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
          <form onSubmit={showPasswordReset ? handlePasswordReset : handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!showPasswordReset && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {showCodeInput && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm">Code</label>
                <input
                  type="text"
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            )}

            {showPasswordReset && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm">Enter New Password</label>
                  <input
                    type="password"
                    className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm">Re-enter New Password</label>
                  <input
                    type="password"
                    className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Re-enter new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="flex flex-col space-y-4">
              {showCodeInput ? (
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
                >
                  Verify Code
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
                >
                  {showPasswordReset ? "Reset Password" : "Log In"}
                </button>
              )}

              <div className="w-full">
                <OAuth />
              </div>

              {!showPasswordReset && (
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-500 hover:underline text-center"
                >
                  Forgot Password?
                </a>
              )}

              {errorMessage && (
                <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

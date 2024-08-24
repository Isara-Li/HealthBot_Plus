import React from "react";

const Login = () => {
  return (
    <div
      className="flex items-center justify-end h-screen w-screen bg-cover pr-60"
      style={{ backgroundImage: "url('/images/login_background.jpg')" }}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-1/2">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm">Email Address</label>
          <input
            type="email"
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;

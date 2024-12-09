import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // Using Lucide icons for menu toggle

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
    setIsMobileMenuOpen(false);
  };

  const handleProfile = () => {
    if (currentUser.is_patient) navigate(`/patient/${currentUser._id}`);
    else navigate(`/doctor/${currentUser._id}`);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  // Helper function to determine if a tab is active
  const isActiveTab = (path) => location.pathname === path;

  // Navigation menu items
  const menuItems = [
    { label: "Getting Started", path: "/getting_started" },
    { label: "Doctor Overview", path: "/doctor_overview" },
    { label: "Patient Stories", path: "/patient_stories" },
    { label: "About Us", path: "/contact" }
  ];

  return (
    <div className="relative">
      {/* Desktop & Mobile Top Bar */}
      <div className="flex bg-white border border-slate-200 h-18 font-sans z-[999] relative">
        {/* Logo Section - Always Visible */}
        <div className="w-1/4 flex justify-center items-center">
          <img
            src={"../images/HealthBot+.PNG"}
            alt="Logo"
            className="h-5/6 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="w-3/4 hidden md:flex justify-center items-center">
          <div className="w-full h-full flex justify-between">
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={`flex-1 flex justify-center items-center ${
                  isActiveTab(item.path) ? "bg-gray-200 rounded-3xl" : ""
                }`}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className="bg-white text-black font-semibold py-2 px-4 w-full h-full"
                >
                  {item.label}
                </button>
              </div>
            ))}

            {/* Profile or Login / Signup */}
            {currentUser ? (
              <div
                className="flex-1 flex justify-center items-center hover:bg-slate-200 rounded-xl cursor-pointer"
                onClick={handleProfile}
              >
                <img
                  className="rounded-full h-7 w-7 object-cover mr-4"
                  src={currentUser.profile}
                  alt="Profile Pic"
                />
                {currentUser.name}
              </div>
            ) : (
              <div
                className="flex-1 flex justify-center items-center hover:bg-slate-200 font-semibold cursor-pointer rounded-xl"
                onClick={handleLoginSignupClick}
              >
                Login / SignUp
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
  <div className="md:hidden fixed inset-0 z-[1000] bg-white">
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {menuItems.map((item) => (
        <button
          key={item.path}
          onClick={() => {
            navigate(item.path);
            setIsMobileMenuOpen(false);
          }}
          className={`w-full text-center p-4 ${
            isActiveTab(item.path) ? "bg-gray-200 rounded-3xl" : ""
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* Mobile Profile/Login Section */}
      {currentUser ? (
        <div
          onClick={handleProfile}
          className="p-4 flex items-center hover:bg-gray-100 cursor-pointer rounded-3xl"
        >
          <img
            className="rounded-full h-8 w-8 object-cover mr-4"
            src={currentUser.profile}
            alt="Profile Pic"
          />
          {currentUser.name}
        </div>
      ) : (
        <button
          onClick={handleLoginSignupClick}
          className="w-full text-left p-4"
        >
          Login / SignUp
        </button>
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarButtonPlain from "./nav_button_plain";
import { useSelector } from "react-redux";
import { FaUserMd, FaComments, FaEnvelope, FaUserCircle } from "react-icons/fa";

function NavbarPatientStories({ activePage }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false); // State for mobile dropdown menu

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
  };

  const handleProfile = () => {
    if (currentUser.is_patient) {
      navigate(`/patient/${currentUser._id}`);
    } else {
      navigate(`/doctor/${currentUser._id}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/"); // Redirect to the home page
  };

  // Function to check if a page is active
  const isActive = (page) =>
    activePage === page
      ? "border-b-4 border-blue-600 text-blue-600 px-4 py-2"
      : "text-gray-600 px-4 py-2 rounded-lg hover:text-blue-600 transition-colors focus:text-blue-600 active:text-blue-600";

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white border-b border-slate-200 h-18 font-sans z-[999] shadow-md relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={"../images/HealthBot+.PNG"}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={handleLogoClick} // Redirect to the home page
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <div className={isActive("getting_started")}>
            <NavbarButtonPlain label="Getting Started" link="/getting_started" />
          </div>
          <div className={isActive("doctor_overview")}>
            <NavbarButtonPlain label="Doctor Overview" link="/doctor_overview" />
          </div>
          <div className={isActive("patient_stories")}>
            <NavbarButtonPlain label="Patient Stories" link="/patient_stories" />
          </div>
          <div className={isActive("contact")}>
            <NavbarButtonPlain label="Contact Us" link="/contact" />
          </div>
        </div>

        {/* Profile or Login / Signup */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div
              className="flex items-center hover:bg-slate-200 rounded-xl cursor-pointer p-2"
              onClick={handleProfile}
            >
              <img
                className="rounded-full h-7 w-7 object-cover mr-2"
                src={currentUser.profile}
                alt="Profile Pic"
              />
              <span>{currentUser.name}</span>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white font-semibold cursor-pointer rounded-lg px-4 py-2"
              onClick={handleLoginSignupClick}
            >
              Login / SignUp
            </button>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={toggleDropdown} // Toggle dropdown menu visibility
          >
            {/* Hamburger Icon (3 Lines) */}
            <div className="space-y-2">
              <div className="w-6 h-1 bg-gray-600 rounded"></div>
              <div className="w-6 h-1 bg-gray-600 rounded"></div>
              <div className="w-6 h-1 bg-gray-600 rounded"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {dropdownOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-lg mt-2 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out absolute right-0">
          {/* Getting Started Menu Item */}
          <div
            className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg ${isActive(
              "getting_started"
            )}`}
          >
            <FaUserMd className="mr-3 text-xl" />
            <NavbarButtonPlain label="Getting Started" link="/getting_started" />
          </div>

          {/* Doctor Overview Menu Item */}
          <div
            className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg ${isActive(
              "doctor_overview"
            )}`}
          >
            <FaUserMd className="mr-3 text-xl" />
            <NavbarButtonPlain label="Doctor Overview" link="/doctor_overview" />
          </div>

          {/* Patient Stories Menu Item */}
          <div
            className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg ${isActive(
              "patient_stories"
            )}`}
          >
            <FaComments className="mr-3 text-xl" />
            <NavbarButtonPlain label="Patient Stories" link="/patient_stories" />
          </div>

          {/* Contact Us Menu Item */}
          <div
            className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg ${isActive(
              "contact"
            )}`}
          >
            <FaEnvelope className="mr-3 text-xl" />
            <NavbarButtonPlain label="Contact Us" link="/contact" />
          </div>

          {/* Profile Section */}
          {currentUser && (
            <div
              className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              onClick={handleProfile}
            >
              <FaUserCircle className="mr-6 text-xl" />
              <div className="flex items-center">
                <img
                  className="rounded-full h-8 w-8 object-cover mr-3"
                  src={currentUser.profile}
                  alt="Profile Pic"
                />
                <span className="text-sm">{currentUser.name}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavbarPatientStories;

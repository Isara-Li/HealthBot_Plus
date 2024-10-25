import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarButtonPlain from "./nav_button_plain";
import { useSelector } from "react-redux";

function NavbarGettingStarted() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

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
    navigate("/");
  };

  const isActive = (page) =>
    page === "getting_started"
      ? "border-b-4 border-blue-600 text-blue-600 px-4 py-2"
      : "text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg hover:text-blue-600 transition-colors focus:text-blue-600 active:text-blue-600";

  return (
    <div className="bg-white border-b border-slate-200 h-18 font-sans z-[999] shadow-md">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarGettingStarted;

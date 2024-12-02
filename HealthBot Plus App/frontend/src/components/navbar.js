import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarButtonPlain from "./nav_button_plain";
import { useSelector } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
  };

  const handleProfile = () => {
    if (currentUser.is_patient) navigate(`/patient/${currentUser._id}`);
    else navigate(`/doctor/${currentUser._id}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center bg-white border border-slate-200 h-18 font-sans z-[999] relative">
      {/* Logo Section */}
      <div className="w-1/4 flex justify-center items-center">
        <img
          src={"../images/HealthBot+.PNG"}
          alt="Logo"
          className="h-5/6 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex w-3/4 justify-end pr-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <HiX className="text-2xl text-gray-800" />
          ) : (
            <HiMenu className="text-2xl text-gray-800" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white border-t border-slate-200 md:static md:flex md:w-3/4 md:justify-between md:items-center`}
      >
        <NavbarButtonPlain label="Getting Started" link="/getting_started" />
        <NavbarButtonPlain label="Doctor Overview" link="/doctor_overview" />
        <NavbarButtonPlain label="Patient Stories" link="/patient_stories" />
        <NavbarButtonPlain label="About Us" link="/contact" />

        {/* Profile or Login / Signup */}
        {currentUser ? (
          <div
            className="flex items-center hover:bg-slate-200 rounded-xl cursor-pointer p-2 md:p-0"
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
          <div
            className="hover:bg-slate-200 font-semibold cursor-pointer rounded-xl p-2 md:p-0"
            onClick={handleLoginSignupClick}
          >
            Login / SignUp
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

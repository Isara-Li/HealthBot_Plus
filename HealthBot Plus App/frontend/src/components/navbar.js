import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarButtonPlain from "./nav_button_plain"; 
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); 

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
    <div className="flex bg-white border border-slate-200 h-18 font-sans z-[999] relative">
      <div className="w-1/4 flex justify-center items-center">
        <img
          src={"../images/HealthBot+.PNG"}
          alt="Logo"
          className="h-5/6 cursor-pointer"
          onClick={handleLogoClick} 
        />
      </div>
      <div className="w-3/4 flex justify-center items-center">
        <div className="w-full h-full flex justify-between">
          {/* Getting Started Button without dropdown */}
          <div className="flex-1 flex justify-center items-center">
            <NavbarButtonPlain label="Getting Started" link="/getting_started" />
          </div>
          {/* Doctor Overview Button */}
          <div className="flex-1 flex justify-center items-center">
            <NavbarButtonPlain label="Doctor Overview" link="/doctor_overview" />
          </div>
          {/* Patient Stories Button */}
          <div className="flex-1 flex justify-center items-center">
            <NavbarButtonPlain label="Patient Stories" link="/patient_stories" />
          </div>
          {/* Contact Us Button */}
          <div className="flex-1 flex justify-center items-center">
            <NavbarButtonPlain label="About Us" link="/contact" />
          </div>
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
              ></img>
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
    </div>
  );
}

export default Navbar;
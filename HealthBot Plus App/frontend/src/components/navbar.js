import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarButton from "./navbar_button";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // get the user from the redux store

  const links_1 = [
    { label: "About", href: "#" },
    { label: "Medical Awards", href: "#" },
  ];

  const links = [
    { label: "Melanoma Detection", href: "#" },
    { label: "Skin Diseases", href: "#" },
    { label: "ChatBot", href: "#" },
  ];

  const links_2 = [
    { label: "Patient Stories", href: "#" },
    { label: "Doctor Stories", href: "#" },
  ];

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
  };

  const handleProfile = () => {
    if (currentUser.is_patient) navigate(`/patient/${currentUser._id}`);
    else navigate(`/doctor/${currentUser._id}`);
  };

  const handleLogoClick = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex bg-white border border-slate-200 h-18 font-sans z-[999] relative">
      <div className="w-1/4 flex justify-center items-center">
        <img
          src={"../images/HealthBot+.PNG"}
          alt="Logo"
          className="h-5/6 cursor-pointer"
          onClick={handleLogoClick} // Add onClick to redirect to home page
        />
      </div>
      <div className="w-3/4 flex justify-center">
        <div className="w-4/5 h-full flex">
          <div className="flex-1 flex justify-center items-center bg-black">
            <NavbarButton label="Getting Started" links={links_1} />
          </div>
          <div className="flex-1 flex justify-center items-center bg-black">
            <NavbarButton label="Skin Health" links={links} />
          </div>
          <div className="flex-1 flex justify-center items-center bg-black">
            <NavbarButton label="Stories" links={links_2} />
          </div>
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
              className="flex-1 hover:bg-slate-200 transform transition duration-400 flex justify-center items-center font-semibold cursor-pointer rounded-xl"
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

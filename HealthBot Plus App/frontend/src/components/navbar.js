import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarButton from "./navbar_button";

function Navbar() {
  const navigate = useNavigate();

  const links_1 = [
    { label: "Option 1", href: "#" },
    { label: "Option 2", href: "#" },
    { label: "Option 3", href: "#" },
  ];

  const links = [
    { label: "Option 1", href: "#" },
    { label: "Option 2", href: "#" },
    { label: "Option 3", href: "#" },
  ];

  const handleLoginSignupClick = () => {
    navigate("/login_signup");
  };

  return (
    <div className="flex bg-slate-100 h-18 font-sans">
      <div className="w-1/4 flex justify-center items-center">
        <img src={"images/SkinVision-Logo.png"} alt="Logo" className="h-4/5" />
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
            <NavbarButton label="Stories" links={links} />
          </div>
          <div
            className="flex-1 hover:bg-blue-100 transform transition duration-400 flex justify-center items-center font-semibold cursor-pointer"
            onClick={handleLoginSignupClick}
          >
            Login / SignUp
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

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
    <div className="flex bg-white border border-slate-200 h-18 font-sans z-[999] relative">
      <div className="w-1/4 flex justify-center items-center">
        <img src={"images/HealthBot+.PNG"} alt="Logo" className="h-5/6" />
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
            className="flex-1 hover:bg-slate-200 transform transition duration-400 flex justify-center items-center font-semibold cursor-pointer"
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

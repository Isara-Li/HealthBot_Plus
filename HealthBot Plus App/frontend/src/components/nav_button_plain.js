import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NavbarButtonPlain({ label, link }) {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(link); 
  };

  return (
    <div className="relative inline-block group w-full h-full">
      <button
        onClick={handleClick} // Navigate when the button is clicked
        className="bg-white text-black font-semibold py-2 px-4 w-full h-full"
      >
        <div className="flex items-center">
          <div className="pr-2">{label}</div>
        </div>
      </button>
    </div>
  );
}

export default NavbarButtonPlain;

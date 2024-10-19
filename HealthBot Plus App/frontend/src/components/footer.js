import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <div className="w-full h-96 mt-32">
      <div className="bg-slate-500 h-80 w-full opacity-90 grid grid-cols-4 text-[17px]">
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 ">COMPANY NAME</h1>
          <p className=" text-justify mt-4 pl-10 text-[17px]">
            HealthBot+ envisions revolutionizing healthcare with AI,
            providing accessible, early disease detection and personalized
            treatment insights.
          </p>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 text-[17px]">HELPFUL LINKS</h1>
          <div className="mt-4 pl-10 flex flex-col">
            <a
              href="https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884"
              className="hover:text-blue-300 mb-4"
            >
              About melanoma
            </a>
            <a
              href="https://my.clevelandclinic.org/health/diseases/21573-skin-diseases"
              className="hover:text-blue-300 mb-4"
            >
              Skin diseases
            </a>
            <a
              href="https://www.medicalnewstoday.com/articles/249141#types"
              className="hover:text-blue-300 mb-4"
            >
              Benign vs Malignant
            </a>
            <a
              href="https://www.dhs.wisconsin.gov/skin-infection/prevention-disinfection.htm"
              className="hover:text-blue-300 mb-4"
            >
              Skin disease prevention
            </a>
          </div>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 text-[17px]">CONTACT</h1>
          <div className="mt-4 pl-10 flex flex-col gap-5">
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <AiOutlineHome size={22} />
              </div>
              <p>Colombo 07, Sri Lanka</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <CiMail size={22} />
              </div>
              <p>info@gmail.com</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <FiPhone size={22} />
              </div>
              <p>+01 234 567 88</p>
            </div>
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <FiPhoneCall size={22} />
              </div>
              <p>+01 234 567 89</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10 w-4/5 text-white text-opacity-90">
          <h1 className="pl-10 text-[17px]">FOLLOW US</h1>
          <div className="mt-4 pl-10 grid grid-cols-2 w-40 gap-5">
            <a href="" className="w-9 hover:cursor-pointer">
              <img src="/images/facebook.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/twitter.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/google.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/instagram.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/linkedin.png" />
            </a>
            <a href="" className="w-9  hover:cursor-pointer">
              <img src="/images/github.png" />
            </a>
          </div>
        </div>
      </div>
      <div className="h-16 w-full bg-slate-600 opacity-85 text-white text-opacity-80 flex justify-center items-center">
        <p>© 2024 Copyright: HealthBot+</p>
      </div>
    </div>
  );
}

export default Footer;

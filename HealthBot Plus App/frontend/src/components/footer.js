import { AiOutlineHome } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiPhone, FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <div className="w-full mt-32">
      <div className="bg-gray-900 text-gray-300 py-10 px-5 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">About HealthBot+</h2>
          <p className="text-justify text-sm">
            HealthBot+ is dedicated to transforming healthcare by harnessing the power of AI, offering accessible and accurate early disease detection, while delivering personalized treatment insights tailored to each patient. Our vision is to make healthcare more efficient and proactive for everyone.
          </p>
        </div>

        {/* Helpful Links Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Helpful Links</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <a
              href="https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884"
              className="hover:text-blue-400"
            >
              About melanoma
            </a>
            <a
              href="https://my.clevelandclinic.org/health/diseases/21573-skin-diseases"
              className="hover:text-blue-400"
            >
              Skin diseases
            </a>
            <a
              href="https://www.medicalnewstoday.com/articles/249141#types"
              className="hover:text-blue-400"
            >
              Benign vs Malignant
            </a>
            <a
              href="https://www.dhs.wisconsin.gov/skin-infection/prevention-disinfection.htm"
              className="hover:text-blue-400"
            >
              Skin disease prevention
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <AiOutlineHome size={20} />
              <p>Colombo 07, Sri Lanka</p>
            </div>
            <div className="flex items-center gap-3">
              <CiMail size={20} />
              <p>healthbot@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone size={20} />
              <p>+01 234 567 88</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhoneCall size={20} />
              <p>+01 234 567 89</p>
            </div>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="grid grid-cols-3 gap-4">
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/twitter.png" alt="Twitter" />
            </a>
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/google.png" alt="Google" />
            </a>
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/instagram.png" alt="Instagram" />
            </a>
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="#" className="w-9 hover:scale-110 transition-transform">
              <img src="/images/github.png" alt="GitHub" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-4 text-center text-gray-400 text-sm">
        <p>© 2024 HealthBot+. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { ReactTyped } from "react-typed"; // Correct import

function LoginSignup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <motion.div
        className="w-screen h-screen flex flex-col lg:flex-row"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section */}
        <div className="h-1/2 lg:h-full lg:w-3/5 bg-slate-500 flex items-center justify-center p-8 lg:p-10 text-center lg:text-left">
          <div className="text-white text-4xl lg:text-6xl font-bold">
            <ReactTyped
              strings={[
                "Empowering skin health with AI.",
                "Smart about skin health HealthBot+",

              ]}
              typeSpeed={100}
              backSpeed={70}
              loop
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="h-1/2 lg:h-full lg:w-2/5 bg-slate-50 flex items-center justify-center p-4">
          <div className="border border-gray-200 p-6 lg:p-8 rounded-lg bg-gray-200 w-full max-w-md lg:w-80">
            <div className="font-bold text-2xl lg:text-3xl text-center mb-6">
              Get started
            </div>
            <div className="flex flex-col lg:flex-row items-center px-4 space-y-4 lg:space-y-0 lg:space-x-6">
              <button
                onClick={handleLogin}
                className="w-40 sm:w-40 lg:w-auto px-6 py-3 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600 text-lg lg:text-xl whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="w-40 sm:w-40 lg:w-auto px-6 py-3 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600 text-lg lg:text-xl whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginSignup;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";

function LoginSignup() {
  const navigate = useNavigate();
  const navigate_ = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate_("/login");
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <motion.div
        className="w-screen h-screen flex"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-full w-3/5 bg-slate-500 flex flex-col">
          <div className="flex pl-10 items-center h-full text-white text-6xl mb-14 font-bold">
            <div>
              Empowering skin health
              <br />
              <span className="font-extrabold">with AI.</span>
            </div>
          </div>
        </div>
        <div className="h-full w-2/5 bg-slate-50 flex items-center justify-center">
          <div className="border border-gray-200 p-8 rounded-lg bg-gray-200">
            <div className="flex font-bold justify-center mb-8 text-3xl">
              Get started
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="p-3 h-14 w-32 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600 text-xl"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="p-3 h-14 w-32 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600 text-xl"
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

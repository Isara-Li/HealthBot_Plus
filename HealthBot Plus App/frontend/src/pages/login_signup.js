import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.div
      className="w-screen h-screen flex"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-3/5 bg-blue-100 flex flex-col">
        <div className="font-bold text-base text-red-600 p-2">HealthBot +</div>
        <div className="flex pl-20 items-center h-full text-red-500 text-2xl mb-14">
          <div>
            Empowering skin health
            <br />
            <span className="font-bold">with AI.</span>
          </div>
        </div>
      </div>
      <div className="h-full w-2/5 bg-slate-50 flex items-center justify-center">
        <div>
          <div className="flex font-bold justify-center mb-2 text-xl">
            Get started
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleLogin}
              className="p-1 h-8 w-20 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="p-1 h-8 w-20 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginSignup;

import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-screen h-screen flex">
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
            <button className="p-1 h-8 w-20 text-white bg-blue-500 border-blue-700 rounded hover:bg-blue-600">
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
    </div>
  );
}

export default LoginSignup;
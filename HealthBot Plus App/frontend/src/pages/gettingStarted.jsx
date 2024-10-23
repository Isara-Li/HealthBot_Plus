import React from "react";
import { FaUserPlus, FaSignInAlt, FaGoogle, FaRobot, FaCheckCircle } from "react-icons/fa";
import NavbarGettingStarted from "../components/navbar_gettingStarted";
import Footer from "../components/footer";

export default function GettingStarted() {
  return (
    <div>
      <NavbarGettingStarted /> {/* Custom Navbar */}

      {/* Introduction Section */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Getting Started with HealthBot+</h1>
          <p className="text-lg text-gray-600 mb-4">
            Follow these steps to begin your journey with HealthBot+. We’ll guide you through creating an account, logging in, and accessing your personalized skin health services.
          </p>
        </div>
      </section>

      {/* Vertical Timeline Steps */}
      <section className="py-10">
        <div className="container mx-auto flex flex-col space-y-10 pl-4"> {/* Adjusted padding to leave space for numbers */}
          
          {/* Step 1 */}
          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              1
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center"> 
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/LoginSignUp.png"
                  alt="Login/SignUp"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaUserPlus className="text-blue-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 1: Click the Login/SignUp Button</h2>
                <p className="text-gray-600">At the top right corner of the page, click the Login/SignUp button to begin.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              2
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Signing Up.png"
                  alt="SignUp Button"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaSignInAlt className="text-green-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 2: Signing Up</h2>
                <p className="text-gray-600">If you don’t have an account yet, click the <strong>SignUp</strong> button to proceed.</p>
              </div>
            </div>
          </div>

          {/* Step 2.1 */}
          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              2.1
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Fill Your Details.png"
                  alt="Fill User Details"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaCheckCircle className="text-purple-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 2.1: Fill Your Details</h2>
                <p className="text-gray-600">
                  Enter your <strong>Name</strong>, <strong>Country</strong>, <strong>Birthday</strong>, <strong>Sex</strong>, and <strong>Description</strong>. Then, click <strong>Next</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2.2 */}
          <div className="relative flex items-center bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              2.2
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Create Your Account.png"
                  alt="Account Creation"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaUserPlus className="text-blue-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 2.2: Create Your Account</h2>
                <p className="text-gray-600">
                  Enter your <strong>Email</strong>, <strong>Password</strong>, and <strong>Confirm Password</strong>. Then, select the doctor from the list and click the <strong>SignUp</strong> button.
                </p>
              </div>
            </div>
          </div>




          {/* Step 3 */}
          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              3
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Click Log In.png"
                  alt="Click Sign In"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaSignInAlt className="text-green-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 3: Click Log In</h2>
                <p className="text-gray-600">
                  If you already have an account, press the <strong>Log In</strong> button to proceed.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3.1 */}
          <div className="relative flex items-center bg-gray-50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              3.1
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Email & Password.png"
                  alt="Email and Password"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaSignInAlt className="text-green-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 3.1: Email & Password</h2>
                <p className="text-gray-600">
                  Enter your <strong>Email</strong> and <strong>Password</strong>, then click <strong>Login</strong> to access your account.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3.2 */}
          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              3.2
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Google Authentication.png"
                  alt="Google Authentication"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaGoogle className="text-red-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 3.2: Google Authentication</h2>
                <p className="text-gray-600">
                Alternatively, you can <strong>seamlessly log in</strong> using <strong>Google Authentication</strong> by clicking the <strong>Continue with Google</strong> button for a fast and secure login experience.

                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold absolute -left-12">
              4
            </div>
            <div className="flex-1 bg-white border-l-4 border-blue-600 rounded-lg p-6 shadow-lg flex items-center">
              <div className="flex-shrink-0 mr-6">
                <img
                  src="../images/Try HealthBot.png"
                  alt="Try Skin HealthBot"
                  className="w-80 h-auto mb-4 hover:scale-125 transition-transform duration-300 ease-in-out object-cover"
                />
              </div>
              <div>
                <FaRobot className="text-blue-500 text-5xl mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Step 4: Try HealthBot</h2>
                <p className="text-gray-600">
                  Once logged in, press the <strong>Try HealthBot</strong> button to begin your personalized skin health journey with HealthBot+.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">You're All Set!</h2>
          <p className="text-lg text-gray-600">
            You’ve successfully created your account or logged in. Now, you can explore the powerful features of HealthBot+ to monitor and take care of your skin health.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/navbar";
import { FaRocketchat } from "react-icons/fa";
import { motion } from "framer-motion";
import AudioRecorder from "../components/AudioRecorder";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"; // Redux imports
import Footer from "../components/footer";

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const currentUser = useSelector((state) => state.user?.currentUser || null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the element is visible
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 4000; // Duration of the animation in ms
      const increment = end / (duration / 10);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.ceil(start));
        }
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isVisible, end]);

  return (
    <span ref={elementRef} className="text-4xl">
      {count}K
    </span>
  );
};

const SkinVisionPage = () => {
  const [chatClicked, setChatClicked] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const { currentUser } = useSelector((state) => state.user || {});
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (chatClicked) {
      timer = setTimeout(() => {
        setShowRecorder(true);
      }, 200);
    } else {
      setShowRecorder(false);
    }

    return () => clearTimeout(timer); // Cleanup timer if chatClicked changes before the timer completes
  }, [chatClicked]);

  const handleTrySkinVisionClick = () => {
    navigate("/diagnose"); // Navigate to the /diagnose page
  };

  return (
    <div className="App">


      <Navbar />
      {/* First Section */}
      <section
        className="relative h-screen flex flex-col-reverse py-6 lg:flex-row items-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="relative container mx-4 md:mx-10 flex flex-col lg:flex-row items-center lg:justify-between h-full px-4 lg:px-8 space-y-6 lg:space-y-0 lg:space-x-1">
          {/* Left Text Content */}
          <div className="text-black max-w-full lg:max-w-lg text-center lg:text-left">
            <h2 className="text-lg font-semibold">Skin Cancer Melanoma Tracking App</h2>
            <h3 className="text-2xl font-light">Smart about skin health</h3>
            <h1 className="text-3xl md:text-6xl font-bold my-4 space-x-4">
              Are your moles getting under your skin?
            </h1>

            {currentUser ? (
              currentUser.is_patient === true ? (
                <button
                  onClick={handleTrySkinVisionClick}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                  Try HealthBot
                </button>
              ) : (
                <div></div>
              )
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Log in to Try HealthBot
              </button>
            )}
          </div>

          {/* Image Content */}
          <div className="max-w-full lg:max-w-md flex justify-center md:w-1/2 lg:w-auto">
            <img
              src="https://www.verywellhealth.com/thmb/qq1afE3eNsGV8bVy29-Zi_oqrAE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-JoshSeong-SkingScreening-Recirc-512cda1d7c674b969a03a36c20d7d178.jpg"
              alt="Skin Screening"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-white flex flex-col py-9 items-center p-4 md:p-8">
        <div className="bg-slate-100 shadow-lg rounded-lg p-4 md:p-8 flex flex-col items-center border border-gray-500 w-full lg:max-w-5xl">
          <div className="text-center text-gray-700">
            <h1 className="text-xl md:text-2xl font-bold mb-2 py-6">
              A reliable skin assessment in 5 minutes
            </h1>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
              {/* Boxed Counter for SkinVision Customers */}
              <div className="text-center border p-4 rounded-lg shadow bg-slate-200">
                <Counter end={18} />
                <p className="text-lg font-medium">HealthBot+ Customers</p>
              </div>
              {/* Boxed Counter for Skin Checks */}
              <div className="text-center border p-4 rounded-lg shadow bg-slate-200">
                <Counter end={35} />
                <p className="text-lg font-medium">Skin Checks</p>
              </div>
              {/* Boxed Counter for Skin Cancers Detected */}
              <div className="text-center border p-4 rounded-lg shadow bg-slate-200">
                <Counter end={55} />
                <p className="text-lg font-medium">Skin Cancers Detected</p>
              </div>
            </div>
            <div className="bg-blue-500 text-white rounded-lg p-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold">HealthBot+ can detect</h2>
              <p className="text-4xl md:text-5xl font-bold">90%</p>
              <p className="text-lg">of skin cancers</p>
            </div>
            <button className="bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full">
              Start checking your skin now
            </button>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <div
        onClick={() => setChatClicked(true)}
        className={`fixed right-4 bottom-4 md:right-[55px] md:bottom-[45px] bg-blue-500 text-white text-sm font-semibold rounded-tl-xl rounded-tr-xl rounded-bl-xl p-2 flex items-center hover:bg-blue-700 transition-all duration-1000 ease-in-out ${chatClicked ? "w-full md:w-96 h-96" : "w-40 h-10 justify-center"}`}
      >
        {chatClicked ? (
          <div className="flex flex-col items-start justify-center">
            <IoCloseCircleOutline
              size={25}
              style={{ padding: "1px", color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setChatClicked(false);
              }}
            />
            {showRecorder && <AudioRecorder />}
          </div>
        ) : (
          <>
            <FaRocketchat size={20} style={{ color: "white" }} />
            <div className="w-2"></div>
            <p>want to chat?</p>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SkinVisionPage;

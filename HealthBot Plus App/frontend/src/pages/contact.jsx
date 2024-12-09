import React, { useState, useRef } from "react";
import Faq from "../components/faq_card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FaRegEnvelopeOpen, FaQuestionCircle, FaArrowDown, FaArrowUp } from "react-icons/fa"; // Import arrow icons

export default function Contact() {
  const [message, setMessage] = useState("");
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false); // Track if at end of scroll
  const faqContainerRef = useRef(null); // Reference to FAQ container

  const [faqs, setFaqs] = useState([
    {
      question: "What are the main symptoms for melanoma?",
      answer:
        "Early symptoms may include changes in the size, shape, or color of a mole. You may also experience itching, tenderness, or bleeding from the mole.",
    },
    {
      question: "How can I prevent melanoma?",
      answer:
        "To reduce the risk of melanoma, avoid excessive sun exposure, use sunscreen, wear protective clothing, and avoid tanning beds.",
    },
    {
      question: "Who is at higher risk for melanoma?",
      answer:
        "People with fair skin, a history of sunburns, a family history of skin cancer, or excessive UV exposure are at higher risk for melanoma.",
    },
    {
      question: "What does melanoma look like?",
      answer:
        "Melanoma can appear as a new spot on the skin or a change in an existing mole. It may look irregular in shape or color, and it can be larger than other moles.",
    },
    {
      question: "How is melanoma diagnosed?",
      answer:
        "Melanoma is diagnosed through a skin exam and a biopsy, where a sample of the suspicious skin area is tested for cancer cells.",
    },
    {
      question: "Is melanoma curable?",
      answer:
        "Melanoma is highly treatable when detected early. Treatment options include surgery, immunotherapy, radiation therapy, and targeted therapies.",
    },
    {
      question: "Can melanoma spread to other parts of the body?",
      answer:
        "Yes, melanoma can metastasize or spread to other organs, such as the lungs, liver, or brain, making early detection and treatment essential.",
    },
    {
      question: "How often should I check my skin for signs of melanoma?",
      answer:
        "It's a good idea to check your skin monthly for any new or changing moles and visit a dermatologist annually for a full-body skin exam.",
    },
    {
      question: "What is the ABCDE rule for melanoma?",
      answer:
        "The ABCDE rule helps identify potential melanomas: A - Asymmetry, B - Border irregularity, C - Color variations, D - Diameter larger than 6mm, E - Evolving or changing over time.",
    },
    {
      question: "Can melanoma develop on areas not exposed to the sun?",
      answer:
        "Yes, although rare, melanoma can develop in areas not typically exposed to sunlight, such as the palms, soles of the feet, and under the nails.",
    },
  ]);
  const handleSendClick = () => {
    const mailtoLink = `mailto:healthbot@gmail.com?subject=Contact%20Message&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
    setMessage("");
  };

  const handleScrollClick = () => {
    const faqContainer = faqContainerRef.current;

    if (faqContainer) {
      if (!isScrolledToEnd) {
        // Scroll down by a fixed amount (e.g., 200px)
        faqContainer.scrollBy({ top: 200, behavior: "smooth" });

        // Check if we've reached the end
        if (
          faqContainer.scrollHeight - faqContainer.scrollTop ===
          faqContainer.clientHeight
        ) {
          setIsScrolledToEnd(true);
        }
      } else {
        // Scroll back to top
        faqContainer.scrollTo({ top: 0, behavior: "smooth" });
        setIsScrolledToEnd(false);
      }
    }
  };

  const handleScroll = () => {
    const faqContainer = faqContainerRef.current;
    if (faqContainer) {
      // If scrolled to the bottom
      if (
        faqContainer.scrollHeight - faqContainer.scrollTop ===
        faqContainer.clientHeight
      ) {
        setIsScrolledToEnd(true);
      } else {
        setIsScrolledToEnd(false);
      }
    }
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <div className="flex justify-center items-center mb-8 mt-10">
        <img
          src={"/images/HealthBot+.PNG"}
          alt="Product Logo"
          className="w-41 h-auto align-middle"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="w-auto p-8 border border-gray-300 rounded-lg bg-gray-50 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4 px-4">
              <FaRegEnvelopeOpen className="mr-4 text-3xl text-blue-500" />  {/* Added envelope icon */}
              <h1 className="text-2xl font-semibold">Contact Us</h1>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="w-80 h-40 p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendClick}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full flex justify-center mt-10">
        <div className="w-[50%] flex items-center justify-center my-8">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-8 text-lg font-bold text-center text-[20px] font-open-sans-condensed">
            FAQ <FaQuestionCircle className="inline-block text-blue-500 ml-2" /> {/* FAQ with icon */}
          </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>
      </div>

      {/* FAQ List with Scroll Direction Icon */}
      <div className="flex justify-center relative">
        <div
          ref={faqContainerRef}
          onScroll={handleScroll}
          className="scrollbar-hide h-[400px] w-[600px] overflow-y-scroll mb-20 relative"
        >
          {faqs.map((faq, index) => (
            <Faq key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Scroll Direction Icon */}
        <div className="absolute bottom-0 w-full flex justify-center items-center">
          {!isScrolledToEnd ? (
            <FaArrowDown
              onClick={handleScrollClick}
              className="text-3xl text-gray-500 cursor-pointer animate-bounce"
            />
          ) : (
            <FaArrowUp
              onClick={handleScrollClick}
              className="text-3xl text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

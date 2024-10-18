import React, { useState } from "react";

function Faq(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpand}
      className={`bg-gray-200 m-5 rounded-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer text-center border border-gray-800 ${
        isExpanded ? "h-[300px]" : "h-[80px]"
      }`}
    >
      <div className="text-lg font-semibold">{props.question}</div>
      {isExpanded && (
        <div className="text-md font-normal mt-2">{props.answer}</div>
      )}
    </div>
  );
}

export default Faq;

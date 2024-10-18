import React, { useState } from 'react';

export default function Contact() {
    const [message, setMessage] = useState("");

    const handleSendClick = () => {
        // You can add functionality to send the message, e.g., API call
        console.log("Message sent:", message);
        alert("Message sent!");
        setMessage(""); // Clear the input field after sending
    };

    return (
        <div>
            <div className="flex justify-center items-center mb-8">
                <img src={"/images/HealthBot+.PNG"} alt="Product Logo" className="w-41 h-auto align-middle" />
            </div>
            <div className="flex justify-center items-center">
                <div className="w-auto p-8 border border-gray-300 rounded-lg bg-gray-50 shadow-lg">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
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
        </div>
    );
}

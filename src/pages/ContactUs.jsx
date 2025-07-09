import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    toast.success("Message Sent Successfully");

    setName("");
    setEmail("");
    setMessage("");

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-orange-200 shadow-lg p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#E76F51] mb-2">Contact Us</h2>
          <p className="text-gray-600">We'd love to hear from you!</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={sendMessage}>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#F4A261] text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#F4A261] text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#F4A261] text-black"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#E76F51] hover:bg-[#D65A3A] text-white font-semibold px-6 py-2 rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Confirmation message */}
        {isSubmitted && (
          <div className="text-center mt-6">
            <p className="text-[#2A9D8F] font-medium mb-2">
               Thank you! We’ll get back to you soon.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-[#E76F51] underline hover:text-[#D65A3A] font-medium"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

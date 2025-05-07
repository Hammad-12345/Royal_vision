import React, { useState } from "react";
import { useForm } from "react-hook-form";

const OnlineChat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const onSubmit = (data) => {
    console.log("Message sent:", data);
    reset();
  };

  return (
    <div>
      {/* Chat Form */}
      <div
        className={`fixed bottom-32 right-20 w-2/6 font-poppins z-50 bg-blue-950 shadow-lg rounded-lg p-4 transition-all duration-300 text-white ${
          isFormOpen ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl text-center font-bold">Live Chat</h1>

          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg text-white bg-transparent"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-200 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Preferred Language</label>
            <input
              type="text"
              placeholder="e.g. English, Urdu"
              className="w-full p-2 border rounded-lg text-white bg-transparent"
              {...register("language", { required: "Language is required" })}
            />
            {errors.language && (
              <p className="text-red-200 text-sm mt-1">
                {errors.language.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-2 border rounded-lg text-white bg-transparent"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-200 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Message</label>
            <input
              type="text"
              placeholder="Type your message"
              className="w-full p-2 border rounded-lg text-white bg-transparent"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-200 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 font-semibold py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>

      {/* Chat Toggle Button */}
      <div
        className="fixed font-poppins bottom-24 right-6 bg-[#1c418b] text-white rounded-full cursor-pointer shadow-lg transition-all duration-300 flex items-center overflow-hidden"
        style={{
          width: isHovered ? "150px" : "56px",
          height: "50px",
          padding: "0 16px",
          justifyContent: isHovered ? "space-between" : "center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleForm}
      >
        {isHovered && (
          <span className="ml-2 text-sm whitespace-nowrap">Live Chat</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={22}
          height={22}
        >
          <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
        </svg>
       
      </div>
    </div>
  );
};

export default OnlineChat;

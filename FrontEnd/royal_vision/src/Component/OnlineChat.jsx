import React, { useState } from "react";
import { useForm } from "react-hook-form";

const OnlineChat = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      message: "Hi! How We Can Help You ",
      from: "admin",
    },
  
  ]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const onSubmit = (data) => {
    setChatHistory((prev) => [
      ...prev,
      { message: data.message, from: "user" },
    ]);
    reset();
  };

  return (
    <div>
      {/* Chat Form */}
      <div
        className={`fixed bottom-36 lg:right-20 right-0 lg:w-1/2 xl:w-2/4 md:w-4/6 sm:w-3/4 w-full lg:p-0 p-2  font-poppins z-50 shadow-xl rounded overflow-hidden transition-transform duration-300 origin-bottom-right ${
          isFormOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-black via-blue-950 to-blue-600 text-white sm:p-4 p-2 flex flex-col h-[500px]">
          <h1 className="text-xl font-bold text-center mb-2">Live Chat</h1>

          {/* Chat History */}
          <div
            className={`flex-1 overflow-y-auto space-y-2 mb-4 p-3 rounded-lg`}
          >
            {chatHistory.length === 0 && (
              <p className="text-gray-300 text-center italic">
                No messages yet
              </p>
            )}
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`sm:p-2 p-1 rounded-lg flex ${
                  chat.from === "user"
                    ? "justify-start   textleft"
                    : "justify-end   textleft"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-4 rounded-2xl text-md break-words ${
                    chat.from === "user"
                      ? "bg-blue-600 text-white ml-2 self-start rounded-bl-none"
                      : "bg-gray-200 text-gray-800 mr-2 self-end rounded-br-none"
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full px-4 py-3 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              {...register("message", { required: "Message is required" })}
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <div
        className="fixed bottom-24 right-6 bg-blue-600 font-semibold text-white rounded-full cursor-pointer shadow-lg transition-all duration-300 flex items-center overflow-hidden"
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
          fill="currentColor"
          width={22}
          height={22}
          viewBox="0 0 24 24"
        >
          <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z" />
        </svg>
      </div>
    </div>
  );
};

export default OnlineChat;

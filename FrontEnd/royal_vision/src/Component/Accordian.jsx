import React, { useState } from "react";

const Accordian = ({ accordian }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      {accordian.map((acc, index) => (
        <div key={index} className="bg-[#1c2a3a] rounded-lg shadow-md mb-2">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left p-5 font-semibold flex justify-between items-center"
          >
            <span>{acc.question}</span>
            <span
              className={`text-xl transition-transform duration-300  `}
            >
              {activeIndex === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={20}
                  height={20}
                >
                  <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={20}
                  height={20}
                >
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-5 py-5 text-gray-300 border-t border-[#2e3b4e]">
              {acc.answer}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordian;

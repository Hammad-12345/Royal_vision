import React from "react";
import { Link } from "react-router-dom";

const TemplateImage = ({ currentPage }) => {
  return (
    <>
      <div
        className="w-full h-[400px] bg-cover bg-center bg-no-repeat relative flex flex-col space-y-4 justify-center px-8 font-poppins"
        style={{
          backgroundImage: "url('https://d3hwx9f38knfi9.cloudfront.net/Banner4.jpg')",
          backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="text-white capitalize text-4xl">{currentPage}</div>
        <div className="relative z-10 flex items-center space-x-2 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
          </svg>
          <Link to="/" className="text-blue-200 font-medium">
            Home
          </Link>
          <span className="text-white">-</span>
          <span className="text-white">{currentPage}</span>
        </div>
      </div>
    </>
  );
};

export default TemplateImage;

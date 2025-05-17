import React from "react";
// import TypingEffect from "./TypingEffect";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d3hwx9f38knfi9.cloudfront.net/changes.mp4"
          type="video/mp4"
        />
      </video>
      {/* <div className="w-full h-full bg-cover bg-no-repeat"  style={{
      backgroundImage: `url(/Banner4.jpg)`,
      backgroundColor: "rgba(31, 41, 55, 0.75)",
      backgroundBlendMode: "multiply",
      backgroundAttachment:"fixed"
      // bac
    }}
      
      ></div> */}

      {/* Blend Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply"></div> */}

      <div className="absolute w-full top-1/3 text-white text-3xl sm:text-5xl font-semibold py-6 font-poppins lg:w-3/4 px-4">
        <div>
        Overland Solutions — Bridging Innovation Across Commerce, Lifestyle &
        Emerging Markets
        </div>
        <div className="mt-6">
        <Link to={"/signin"} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full transition duration-300">
          Get Started
        </Link>
      </div>
      </div>
      {/* Typing Text Content */}

      {/* <TypingEffect /> */}
    </div>
  );
};

export default Banner;

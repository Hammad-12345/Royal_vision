import React from "react";
import TypingEffect from "./TypingEffect";

const Banner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
         <source src="changes.mp4" type="video/mp4" />
      </video> */}
      <div className="w-full h-full bg-cover bg-no-repeat"  style={{
      backgroundImage: `url(/Banner4.jpg)`,
      backgroundColor: "rgba(31, 41, 55, 0.75)",
      backgroundBlendMode: "multiply",
      backgroundAttachment:"fixed"
      // bac
    }}
      
      ></div>

      {/* Blend Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply"></div>

      {/* Typing Text Content */}

      <TypingEffect />
    </div>
  );
};

export default Banner;

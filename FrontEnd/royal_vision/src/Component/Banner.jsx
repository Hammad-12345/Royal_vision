import React from "react";
import TypingEffect from "./TypingEffect";

const Banner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src={"changes.mp4"}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blend Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply"></div>

      {/* Typing Text Content */}

      <TypingEffect />
    </div>
  );
};

export default Banner;

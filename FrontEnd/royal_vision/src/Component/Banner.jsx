import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { Link } from "react-router-dom";
import TypingEffect from "./TypingEffect";

const Banner = () => {

  return (
    <div className="z-0 w-full h-screen relative">
      <video
        src={"combinevideonew.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1/3 left-1/4 text-white px-6">
      <TypingEffect/>
      </div>
    </div>
  );
};

export default Banner;

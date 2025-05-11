import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
const Banner = () => {
  const slides = [
    {
      image: "/Banner6.jpg",
      title: "Welcome to  Overland Solutions",
    },
    {
      image: "/Banner5.jpg",
      title: "Trade Smart, Grow Fast – Your Forex Journey Begins Here",
    },
    {
      image: "/Banner4.jpg",
      title: "Empowering Traders Worldwide with Real-Time Solutions",
    },
  ];
  return (
    <>
      <div className="z-0 w-full h-screen">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-start font-poppins bg-gradient-to-r from-black via-blue-950 to-blue-600"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className="flex flex-col items-start px-6 space-y-4 w-2/5">
                  <div className=" bg-opacity-50  py-4 rounded-xl text-white text-3xl md:text-5xl font-bold">
                    {slide.title}
                  </div>
                  <Link to={"/signin"} className="bg-blue-600 font-semibold rounded-full text-white px-6 py-4  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm">
                    Get Started
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </>
  );
};

export default Banner;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
const Banner = () => {
  const slides = [
    {
      image: "/Banner6.jpg",
      title: "Welcome to Royal Vision Global Partner",
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
      <div className="relative z-0 w-full h-screen">
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
                className="w-full h-full bg-cover bg-center flex items-center justify-start font-poppins relative"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundColor: 'rgba(31, 41, 55, 0.75)',
                  backgroundBlendMode: 'multiply'
                }}
              >
                <div className="flex flex-col items-start px-6 space-y-4 w-1/2">
                  <div className=" bg-opacity-50  py-4 rounded-xl text-white text-3xl md:text-5xl font-bold">
                    {slide.title}
                  </div>
                  <button className="bg-blue-200 hover:bg-[#F6F0F0] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                    Get Started
                  </button>
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

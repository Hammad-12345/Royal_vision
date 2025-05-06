import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
const Banner = () => {
  const slides = [
    {
      image: "/Banner1.jpg",
      title: "Welcome to Royal Vision Global Partner",
    },
    {
      image: "/Banner2.jpg",
      title: "Trade Smart, Grow Fast – Your Forex Journey Begins Here",
    },
    {
      image: "/Banner3.jpg",
      title: "Empowering Traders Worldwide with Real-Time Solutions",
    },
  ];
  return (
    <>
      <div className="relative w-full h-screen">
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
                className="w-full h-full bg-cover bg-center flex items-center justify-center font-poppins relative"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundColor: 'rgba(31, 41, 55, 0.75)',
                  backgroundBlendMode: 'multiply'
                }}
              >
                <div className="flex flex-col items-center gap-8 w-4/5">
                  <div className="bg-black bg-opacity-50 px-6 py-4 rounded-xl text-white text-3xl md:text-5xl font-bold text-center">
                    {slide.title}
                  </div>
                  <button className="bg-blue-200 hover:bg-blue-700 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
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

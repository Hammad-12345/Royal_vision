import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import TemplateImage from "./TemplateImage";
import OnlineChat from "./OnlineChat";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Function to get the current page name
  const getCurrentPage = (pathname) => {
    if (pathname.includes('Deposit')) {
      return 'Deposit';
    }
    return pathname.slice(1);
  };

  useEffect(() => {
    setIsSplashVisible(true);
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1350);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Splash Screen with banner4 */}
      {/* {isSplashVisible ? (
        <div
          className="fixed inset-0 z-[9999] bg-center bg-cover flex items-center justify-center transition-opacity duration-700"
        
            style={{
              backgroundImage: `url(https://d3hwx9f38knfi9.cloudfront.net/Auth.jpg)`,
              backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
              backgroundBlendMode: "overlay",
          }}
    
        >
          <div className="flex flex-col max-w-3xl items-center space-y-4">
            <h1 className="text-white flex flex-col sm:flex-row sm:space-x-4 text-4xl md:text-6xl font-bold sm:items-start items-center drop-shadow-lg font-poppins">
              <div> Overland </div>
              <div className="text-blue-400 font-extrabold typing overflow-hidden">
                Solutions
              </div>
            </h1>

            {/* Loading Line Animation */}
      {/* <div className="w-full h-1  bg-white rounded overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black via-blue-950 to-black  animate-loading-line"></div>
            </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* ) : ( */}
      <>
        {/* <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6,ease:"easeInOut"}}
            > */}
        {/* <section class="wrapper">
                <div id="stars"></div>
                <div id="stars2"></div>
              </section> */}

        <Header />
        {!isHomePage && (
          <TemplateImage currentPage={getCurrentPage(location.pathname)} />
        )}
        <div className={`font-poppins bg-gradient-to-r from-black via-blue-950 to-black ${
          location.pathname !== "/" && location.pathname !== "/faqs" && location.pathname !== "/contact" 
          ? "px-4 sm:px-6 lg:px-8 py-8 text-white" 
          : ""
        }`}>
          <Outlet />
        </div>
        <Footer />
        {/* </motion.div>
          </AnimatePresence> */}

        {/* Scroll to top button */}
        <div
          className={`size-12 sm:size-14 text-white flex justify-center items-center rounded-full fixed z-50 bottom-4 sm:bottom-6 right-4 sm:right-6 bg-blue-600 font-semibold cursor-pointer transition-all duration-300 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          onClick={scrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="sm:w-[22px] sm:h-[22px]"
          >
            <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
          </svg>
        </div>
        {/* {showScrollTop && <OnlineChat />} */}
      </>
      {/* )} */}
    </>
  );
};

export default Layout;

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

  useEffect(() => {
    setIsSplashVisible(true);
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2500); // Show splash screen for 2.5 seconds
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
      {isSplashVisible ? (
        <div
          className="fixed inset-0 z-[9999] bg-center bg-cover flex items-center justify-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('/Banner4.jpg')`,
            backgroundColor: "rgba(31, 41, 55, 0.75)",
            backgroundBlendMode: "multiply",
          }}
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold animate-pulse text-center drop-shadow-lg font-poppins">
            Royal Vision Global Partner
          </h1>
        </div>
      ) : (
        <>
          <Header />
          {!isHomePage && (
            <TemplateImage currentPage={location.pathname.slice(1)} />
          )}
          <Outlet />
          <Footer />

          {/* Scroll to top button */}
          <div
            className={`size-14 text-white flex justify-center items-center rounded-full fixed z-50 bottom-6 right-6 bg-[#1c418b] cursor-pointer transition-all duration-300 ${
              showScrollTop
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
            </svg>
          </div>
          {showScrollTop && <OnlineChat />}
        </>
      )}
    </>
  );
};

export default Layout;

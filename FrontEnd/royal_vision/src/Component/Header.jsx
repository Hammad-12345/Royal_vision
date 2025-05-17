import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact us" },
    { path: "/plans", label: "Plans" },
    { path: "/how-it-works", label: "How it works" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full text-white shadow-lg z-50 bg-gradient-to-r from-black via-blue-950 to-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center relative">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins"
            >
              <img
                src="https://overlandresources.s3.eu-north-1.amazonaws.com/logodesign.png"
                className="w-16 h-16"
                alt="logo"
              />
            </Link>
            <span className="uppercase text-[10px] font-poppins"> Overland Solutions</span>
           
          </div>

          {/* Navbar Section */}
          <nav
            className={`
              lg:relative absolute lg:mt-0 top-0 left-0 right-0 
              lg:bg-none bg-gradient-to-r from-black via-blue-950 to-black 
              flex lg:flex-row flex-col 
              lg:space-y-0 space-y-8 lg:px-0 px-6 lg:py-0 py-8 lg:space-x-8 font-poppins 
              transition-transform transform origin-top duration-300 
              ${menuOpen ? "scale-100" : "scale-0"} 
              lg:scale-100
            `}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative group lg ${
                  isActive(link.path)
                    ? "lg:text-blue-400 text-[#1f69ff] lg:bg-transparent bg-white lg:p-0 p-3 lg:rounded-none rounded-full"
                    : "hover:text-blue-400 lg:p-0 p-3"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <span
                  className={`absolute lg:block hidden bottom-0 left-0 w-full h-0.5 bg-blue-200 transform ${
                    isActive(link.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } transition-transform duration-300`}
                ></span>
              </Link>
            ))}
            <Link
              to={"/signin"}
              className="bg-blue-600 lg:hidden font-semibold rounded-full text-white px-6 py-3  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>

          {/* Login Button Section */}
          <div className="hidden lg:flex items-center">
            <Link
              to={"/signin"}
              className="bg-blue-600 font-semibold rounded-full text-white px-6 py-2  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width={28}
              height={28}
              className="text-white"
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

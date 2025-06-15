import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <footer
      className="text-white border-t border-blue-950 font-poppins bg-gradient-to-r from-black via-blue-950 to-black bg-cover bg-center relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center justify-between space-y-6 py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-2xl flex flex-col items-center text-white hover:text-blue-200 transition-colors font-poppins">
            <img 
              src="https://overlandresources.s3.eu-north-1.amazonaws.com/newlogo-removebg-preview.png"  
              className="w-20 h-12 sm:w-24 sm:h-16"
              alt="Overland Solutions Logo" 
            />
            <span className="text-[10px] uppercase mt-1">Overland Solutions</span>
          </div>
          <div className="flex flex-wrap justify-center w-full gap-6 sm:gap-12">
            <NavLink
              to="/faqs"
              className={`text-base sm:text-lg font-medium relative group ${
                isActive("/faqs") ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              FAQs
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform ${
                  isActive("/faqs")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                } transition-transform duration-300`}
              ></span>
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={`text-base sm:text-lg font-medium relative group ${
                isActive("/how-it-works")
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              How It Works
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform ${
                  isActive("/how-it-works")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                } transition-transform duration-300`}
              ></span>
            </NavLink>
            <NavLink
              to="/policy"
              className={`text-base sm:text-lg font-medium relative group ${
                isActive("/policy") ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
              Policy
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform ${
                  isActive("/policy")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                } transition-transform duration-300`}
              ></span>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:items-center sm:justify-between py-8 border-t border-gray-800 px-4 sm:px-6 lg:px-8">
          {/* Copyright Text */}
          <div className="text-center sm:text-left text-gray-400 text-base sm:text-lg">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-blue-200">Overland Solutions.</span> All rights
              reserved.
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaFacebook size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaTwitter size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaInstagram size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

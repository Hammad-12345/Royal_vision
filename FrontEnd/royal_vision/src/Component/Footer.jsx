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
      className=" text-white font-poppins  bg-cover bg-center relative"
      style={{
        backgroundImage: `url(Banner1.jpg)`,
        backgroundColor: "rgba(31, 41, 55, 0.75)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div>
        <div className="w-full flex flex-col items-center justify-between space-y-6 py-8">
          <div className="text-2xl flex flex-col items-center text-white hover:text-blue-200 transition-colors font-poppins">
          <img src="/logodesign.jpg"  className="w-16 h-16"
             alt="" srcset="" />
             <span className="text-[10px] uppercase">Overland Solutions</span>
          </div>
          <div className="flex justify-center w-full space-x-12">
            <NavLink
              to="/faqs"
              className={`text-lg font-medium relative group ${
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
              className={`text-lg font-medium relative group ${
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
              className={`text-lg font-medium relative group ${
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
        <div className="flex lg:flex-row flex-col space-y-4 lg:items-start items-center  lg:justify-between py-8 border-t border-gray-800 px-6">
          {/* Copyright Text */}
          <div className="text-center text-gray-400 text-lg">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-blue-200"> Overland Solutions. </span> All rights
              reserved.
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaDownload,
  FaUpload,
  FaHistory,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// Spinner Component
const Spinner = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

const sidebarLinks = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
  { label: "Investment Plans", icon: <FaMoneyCheckAlt />, path: "/Plans" },
  { label: "Deposit", icon: <FaDownload />, path: "/Deposit" },
  { label: "Withdraw", icon: <FaUpload />, path: "/Withdraw" },
  { label: "Wallet", icon: <FaUpload />, path: "/Withdraw" },
];

const nestedLinks = [
  { label: "Overall Investment History", path: "/investment-history" },
  { label: "Gold Trading", path: "/deposit-history/gold" },
  { label: "Air bnb", path: "/deposit-history/airbnb" },
  { label: "Mineral Water", path: "/deposit-history/mineral-water" },
  { label: "Retro Drops", path: "/deposit-history/retro-drops" },
  { label: "Amazon", path: "/deposit-history/amazon" },
];

// Route to title mapping
const routeTitles = {
  "/": "Dashboard",
  "/Plans": "Investment Plans",
  "/Deposit": "Deposit",
  "/Withdraw": "Withdraw",
  "/investment-history": "Overall Investment History",
  "/deposit-history/gold": "Gold Trading History",
  "/deposit-history/airbnb": "Airbnb History",
  "/deposit-history/mineral-water": "Mineral Water History",
  "/deposit-history/retro-drops": "Retro Drops History",
  "/deposit-history/amazon": "Amazon History",
  "/logout": "Logout",
};

const UserDashboardLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActive = (path) => location.pathname === path;

  // // Show spinner on route change
  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 500); // Simulate loading delay
  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  // Get dynamic title
  const headerTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <div className="flex h-screen font-poppins bg-gradient-to-r from-black via-blue-950 to-black text-white">

      {/* Sidebar */}
      <aside
        className={`fixed h-full z-20 flex flex-col border-r border-gray-800 shadow-2xl transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 text-xl font-bold text-center border-b border-gray-800 flex justify-between items-center">
          <div className="flex-shrink-0 flex space-x-4 items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins"
            >
              <img
                src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"
                className="w-16 h-16"
                alt="logo"
              />
            </Link>
            <span className="uppercase text-xs font-poppins">
              Overland Solutions
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-auto flex flex-col justify-between">
          <div className="space-y-4">
            {sidebarLinks.map(({ label, icon, path }) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300 ${
                  isActive(path) ? "bg-blue-600" : ""
                }`}
              >
                {icon} <span>{label}</span>
              </Link>
            ))}

            <div>
              <div
                onClick={toggleDropdown}
                className="flex items-center justify-between space-x-2 p-2 hover:bg-blue-800 rounded cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <FaHistory /> <span>Deposit History</span>
                </div>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div
                className={`ml-6 mt-2 space-y-1 text-sm transition-all duration-300 ${
                  isDropdownOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {nestedLinks.map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300 ${
                      isActive(path) ? "bg-blue-600" : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/logout"
            className="p-2 flex items-center space-x-2 hover:bg-blue-500 transition-colors duration-300 rounded cursor-pointer"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out w-full ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } flex flex-col`}
      >
        {/* Header */}
        <header className="flex justify-between border-b border-gray-800 items-center shadow px-6 py-4 sticky top-0 z-10 bg-opacity-90">
          <div className="flex items-center md:space-x-0 space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-400 text-xl"
            >
              <FaBars />
            </button>
            <span className="text-xl font-semibold m-0">{headerTitle}</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-xl text-gray-400 cursor-pointer" />
            <div className="relative">
              <FaUserCircle className="text-2xl text-gray-400 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* {loading ? (
            <Spinner />
          ) : ( */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          {/* )} */}
        </main>

        {/* Footer */}
        <footer className="text-center p-4 border-t border-gray-800">
          &copy; {new Date().getFullYear()} Overland Solutions. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

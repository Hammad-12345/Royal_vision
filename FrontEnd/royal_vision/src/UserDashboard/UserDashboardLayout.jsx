import React, { useState } from "react";
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
  FaWallet,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { LoggedOut } from "../Redux/Slice/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Spinner Component
// const Spinner = () => (
//   <div className="h-full w-full flex items-center justify-center">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
//   </div>
// );

const sidebarLinks = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { label: "Investment Plans", icon: <FaMoneyCheckAlt />, path: "/Plans" },
  { label: "Deposit", icon: <FaDownload />, path: "/Deposit" },
  { label: "Withdraw", icon: <FaUpload />, path: "/Withdraw" },
  { label: "Wallet", icon: <FaWallet />, path: "/Wallet" },
  { label: "Referal", icon: <FaWallet />, path: "/referal" },
  {
    label: "Deposit History",
    icon: <FaHistory />,
    path: "/investment-history",
  },
  {
    label: "Withdraw History",
    icon: <FaHistory />,
    path: "/withdrawhistory",
  },
];

const nestedLinks = [
  { label: "Overall Investment History", path: "/investment-history" },
  { label: "Gold Trading", path: "/goldhistory" },
  { label: "Air bnb", path: "/airbnbhistory" },
  { label: "Mineral Water", path: "/mineralwaterhistory" },
  { label: "Retro Drops", path: "/retrodropshistory" },
  { label: "Amazon", path: "/amazonhistory" },
];

// Route to title mapping
const routeTitles = {
  "/dashboard": "Dashboard",
  "/Plans": "Investment Plans",
  "/Deposit": "Deposit",
  "/Withdraw": "Withdraw",
  "/Wallet": "Wallet",
  "/withdrawhistory": "Withdraw History",
  "/referal": "Referal",
  "/investment-history": "Deposit History",
  "/goldhistory": "Gold Trading History",
  "/airbnbhistory": "Airbnb History",
  "/mineralwaterhistory": "Mineral Water History",
  "/retrodropshistory": "Retro Drops History",
  "/amazonhistory": "Amazon History",
  "/logout": "Logout",
  "/account": "Account",
};

const UserDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.Token.userDetail);
  // const [loading, setLoading] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActive = (path) => location.pathname === path;
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);

  const toggleUserPopover = () => {
    setShowUserPopover(!showUserPopover);
    setShowNotificationPopover(false); // Close the other popover
  };

  const toggleNotificationPopover = () => {
    setShowNotificationPopover(!showNotificationPopover);
    setShowUserPopover(false); // Close the other popover
  };

  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("user");
    dispatch(LoggedOut());
    navigate("/");
  };
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

            {/* <div>
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
            </div> */}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            onClick={() => {
              localStorage.removeItem("mytoken");
              localStorage.removeItem("user");
              dispatch(LoggedOut());
              navigate("/");
            }}
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
            <span className="text-xl font-semibold m-0 text-white">
              {headerTitle}
            </span>
          </div>

          <div className="flex items-center space-x-6 relative">
            {/* Notification Icon */}
            <div className="relative">
              <FaBell
                onClick={toggleNotificationPopover}
                className="text-xl text-gray-400 cursor-pointer"
              />
              {showNotificationPopover && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1b1f2a] text-white rounded shadow-lg z-20">
                  <div className="px-4 py-2 border-b border-gray-700 font-semibold">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-auto">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      You have a new message
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Your order was confirmed
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      System update at 10 PM
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Icon */}
            <div className="relative">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={toggleUserPopover}
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-400" />
                )}
                <div>{user.Name?.split(" ")[1]}</div>
              </div>
              {showUserPopover && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1b1f2a] text-white rounded shadow-lg z-20">
                  <ul>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      <FaUserCircle className="mr-2" />
                      <Link to="/account">Account</Link>
                    </li>
                    <li
                      className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-2" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
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
          &copy; {new Date().getFullYear()} Overland Solutions. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

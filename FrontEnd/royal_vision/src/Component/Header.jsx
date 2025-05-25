import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTachometerAlt, FaMoneyCheckAlt, FaDownload, FaUpload, FaHistory, FaSignOutAlt, FaWallet, FaHome, FaUserCircle, FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LoggedOut } from "../Redux/Slice/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const token = useSelector((state) => state.Token.DashboardRoutes);
  const user = useSelector((state) => state.Token.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarLinks = useMemo(() => [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Investment Plans", icon: <FaMoneyCheckAlt />, path: "/Plans" },
    { label: "Deposit", icon: <FaDownload />, path: "/Deposit" },
    { label: "Withdraw", icon: <FaUpload />, path: "/Withdraw" },
    { label: "Wallet", icon: <FaWallet />, path: "/Wallet" },
    { label: "Referal", icon: <FaWallet />, path: "/referal" },
    { label: "Deposit History", icon: <FaHistory />, path: "/investment-history" },
    { label: "Withdraw History", icon: <FaHistory />, path: "/withdrawhistory" },
    { label: "About us", icon: <FaHome />, path: "/about" },
    { label: "Contact us", icon: <FaHome />, path: "/contact" },
    { label: "How it works", icon: <FaHome />, path: "/how-it-works" },
  ], []);

  const isActive = useMemo(() => (path) => location.pathname === path, [location.pathname]);

  const handleLogout = useMemo(() => () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("user");
    dispatch(LoggedOut());
    navigate("/");
  }, [dispatch, navigate]);

  const toggleUserPopover = useMemo(() => () => {
    setShowUserPopover(prev => !prev);
    setShowNotificationPopover(false);
  }, []);

  const toggleNotificationPopover = useMemo(() => () => {
    setShowNotificationPopover(prev => !prev);
    setShowUserPopover(false);
  }, []);

  const userDisplayName = useMemo(() => user?.Name?.split(" ")[1] || "User", [user?.Name]);

  // Add effect to close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full text-white shadow-lg z-50 bg-gradient-to-r from-black via-blue-950 to-black font-poppins">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center relative">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex flex-col items-center">
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
              <span className="uppercase text-[10px] font-poppins"> Overland Solutions</span>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex justify-center flex-1">
              {!token && (
                <div className="flex items-center space-x-8 font-poppins">
                  <Link
                    to="/"
                    className={`text-gray-400 hover:text-white transition-colors ${
                      isActive("/") ? "text-white" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/Plans"
                    className={`text-gray-400 hover:text-white transition-colors ${
                      isActive("/Plans") ? "text-white" : ""
                    }`}
                  >
                    Plans
                  </Link>
                  <Link
                    to="/about"
                    className={`text-gray-400 hover:text-white transition-colors ${
                      isActive("/about") ? "text-white" : ""
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-gray-400 hover:text-white transition-colors ${
                      isActive("/contact") ? "text-white" : ""
                    }`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/how-it-works"
                    className={`text-gray-400 hover:text-white transition-colors ${
                      isActive("/how-it-works") ? "text-white" : ""
                    }`}
                  >
                    How it Works
                  </Link>
                </div>
              )}
            </div>

            {/* Header Right Section (Icons and User) */}
            <div className="flex items-center space-x-6 relative">
              {!token ? (
                <Link
                  to={"/signin"}
                  className="bg-blue-600 font-semibold rounded-full text-white px-6 py-2 hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaBars size={24} />
                  </button>
                  {/* Notification Icon */}
                  <div className="relative">
                    <FaBell
                      onClick={toggleNotificationPopover}
                      className="text-xl text-gray-400 cursor-pointer hover:text-white transition-colors"
                    />
                    {showNotificationPopover && (
                      <div className="absolute right-0 mt-2 w-64 bg-[#1b1f2a] text-white rounded shadow-lg z-20">
                        <div className="px-4 py-2 border-b border-gray-700 font-semibold">
                          Notifications
                        </div>
                        <ul className="max-h-60 overflow-auto">
                          <li className="px-4 py-2 text-sm text-gray-400">No new notifications</li>
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
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-2xl text-gray-400" />
                      )}
                      <div className="text-sm font-poppins">{userDisplayName}</div>
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {token && (
        <aside
          className={`fixed top-0 left-0 h-full z-40 flex flex-col border-r border-gray-800 shadow-2xl transition-all duration-300 bg-gradient-to-r from-black via-blue-950 to-black ${
            sidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="p-4 text-xl font-bold text-center border-b border-gray-800 flex justify-between items-center">
            <div className="flex-shrink-0 flex space-x-4 items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins"
                onClick={() => setSidebarOpen(false)}
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

          <nav className="p-4 space-y-2 flex-1 overflow-auto flex flex-col justify-between font-poppins text-white">
            <div className="space-y-1">
              {sidebarLinks.map(({ label, icon, path }) => (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 ${
                    isActive(path) ? "bg-blue-600" : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="text-xl">{icon}</div>
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-gray-800 pt-4">
              <button
                onClick={() => {handleLogout(); setSidebarOpen(false);}}
                className="w-full p-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-700 transition-colors duration-200 text-left rounded-md"
              >
                <div className="text-xl"><FaSignOutAlt /></div>
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Header;

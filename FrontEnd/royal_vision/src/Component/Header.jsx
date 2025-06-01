import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTachometerAlt, FaMoneyCheckAlt, FaDownload, FaUpload, FaHistory, FaSignOutAlt, FaWallet, FaHome, FaUserCircle, FaBell, FaTimes, FaInfoCircle, FaEnvelope, FaCogs, FaChartLine } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LoggedOut } from "../Redux/Slice/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// Add animation styles
const styles = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }

  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const token = useSelector((state) => state.Token.DashboardRoutes);
  const user = useSelector((state) => state.Token.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

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
    { label: "About us", icon: <FaInfoCircle />, path: "/about" },
    { label: "Contact us", icon: <FaEnvelope />, path: "/contact" },
    { label: "How it works", icon: <FaCogs />, path: "/how-it-works" },
  ], []);

  const publicLinks = useMemo(() => [
    { label: "Home", path: "/" },
    { label: "Plans", path: "/Plans" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    { label: "How it Works", path: "/how-it-works" },
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

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('mytoken');
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/notifications', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('mytoken');
      const response = await fetch(`https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    if (showNotificationPopover) {
      fetchNotifications();
    }
  }, [showNotificationPopover]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'investment':
        return <FaMoneyCheckAlt className="text-2xl sm:text-xl text-blue-400" />;
      case 'profit':
        return <FaChartLine className="text-2xl sm:text-xl text-green-400" />;
      case 'withdrawal':
        return <FaWallet className="text-2xl sm:text-xl text-yellow-400" />;
      default:
        return <FaBell className="text-2xl sm:text-xl text-gray-400" />;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Add effect to close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Add effect to close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return(
    <>
      <style>{styles}</style>
      <header className="fixed top-0 left-0 w-full text-white shadow-lg z-20 bg-gradient-to-r from-black via-blue-950 to-black font-poppins">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center relative">
            {/* Menu Icon on Left */}
            {token ? (
              <>
                            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-white transition-colors text-xl sm:text-2xl mr-4"
              >
                <FaBars />
              </button>
              <div className="flex-shrink-0 flex  items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins"
              >
                <img
                  src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                  alt="logo"
                />
              </Link>
              <span className="uppercase text-[10px] sm:text-xs font-poppins text-white"> Overland Solutions Group</span>
              {/* Mobile Menu Icon - MOVED TO RIGHT */}
              </div>
            </div>
            </div>
            </>
            ) : (
              <>
              <div className="flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-400 hover:text-white transition-colors text-xl sm:text-2xl mr-4 lg:hidden"
              >
                <FaBars />
              </button>
              <div className="flex-shrink-0 flex  items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins"
              >
                <img
                  src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                  alt="logo"
                />
              </Link>
              <span className="uppercase text-[10px] sm:text-xs font-poppins text-white"> Overland Solutions Group</span>
              {/* Mobile Menu Icon - MOVED TO RIGHT */}
              </div>
            </div>
            </div>
              </>
            )}

            {/* Logo Section */}

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
            <div className="flex items-center space-x-4 sm:space-x-6 relative">
              {!token ? (
                <>
                  <Link
                    to={"/signin"}
                    className="bg-blue-600 font-semibold rounded-full text-white sm:px-6 px-4 py-2 hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  {/* User Icon and Name */}
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
                      {/* User Display Name - MOVED TO POPOVER */}
                    </div>
                    {showUserPopover && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#1b1f2a] text-white rounded shadow-lg z-20">
                        <ul>
                          {/* User Name in Popover */}
                          <div className="px-4 py-3 text-sm font-semibold border-b border-gray-700">Hello, {userDisplayName}</div>
                          <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                            <FaUserCircle className="mr-2" />
                            <Link to="/account">Account</Link>
                          </li>
                          {/* <li
                            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={toggleNotificationPopover}
                          >
                            <FaBell className="mr-2" />
                            <span>Notifications</span>
                          </li> */}
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

      {/* Mobile Menu for Non-Logged In Users */}
      {!token && (
        <div
          className={`fixed top-[63px] sm:top-[80px] left-0 right-0 w-full bg-gradient-to-r from-black via-blue-950 to-black z-40 transform transform-origin-top p-4 overflow-y-auto max-h-[calc(100vh-80px)] lg:hidden ${
            menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-end items-center border-b border-gray-800 pb-4">
            {/* Close button removed as requested */}
          </div>
          <nav className="pt-4">
            <ul className="space-y-2">
              {publicLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className={`block px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-poppins text-white ${
                      isActive(path) ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Sidebar */}
      {token && (
        <aside
          ref={sidebarRef}
          className={`fixed left-0 h-full z-40 flex flex-col border-r border-gray-800 shadow-2xl transition-all duration-300 bg-gradient-to-r from-black via-blue-950 to-black ${
            sidebarOpen ? "w-72" : "w-0 overflow-hidden"
          }`}
        > <div className="flex-shrink-0 flex  items-center space-x-2 sm:space-x-4 border-b border-gray-600  p-4">
        <div className="flex items-center space-x-2">
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
        <span className="uppercase text-[10px] sm:text-xs font-poppins text-white"> Overland Solutions Group</span>
        {/* Mobile Menu Icon - MOVED TO RIGHT */}
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

      {showNotificationPopover && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-black via-blue-950 to-black z-50 transform transition-all duration-300 ease-in-out font-poppins animate-slideDown
          sm:top-[80px] sm:right-4 sm:w-96 sm:h-auto sm:rounded-xl sm:shadow-2xl sm:backdrop-blur-lg sm:bg-opacity-95 sm:animate-slideIn
          flex flex-col">
          <div className="flex justify-between items-center border-b border-gray-800 p-4 sticky top-0 bg-gradient-to-r from-black via-blue-950 to-black z-10 flex-shrink-0">
            <h3 className="text-xl sm:text-lg font-semibold text-white flex items-center">
              <FaBell className="mr-3 text-2xl sm:text-xl text-blue-400" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <FaTimes 
              className="text-white text-2xl sm:text-xl cursor-pointer hover:text-blue-400 transition-colors" 
              onClick={toggleNotificationPopover}
            />
          </div>
          <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification._id}
                    className={`bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 rounded-lg p-4 cursor-pointer transform hover:scale-[1.02] ${!notification.isRead ? 'border-l-4 border-blue-500' : ''}`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-lg sm:text-base truncate">{notification.title}</p>
                        <p className="text-gray-400 text-base sm:text-sm mt-1.5 line-clamp-2">{notification.message}</p>
                        <p className="text-gray-500 text-sm sm:text-xs mt-2.5">{formatTimeAgo(notification.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No notifications yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default Header;

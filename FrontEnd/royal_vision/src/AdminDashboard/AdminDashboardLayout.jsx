import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronLeft,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaUserFriends,
  FaChartLine,
  FaBell,
  FaTimes,
  FaMoneyCheckAlt,
  FaWallet,
  FaUserPlus,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoggedOut } from "../Redux/Slice/auth";
import { toast } from "react-toastify";

const AdminDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const notificationRef = useRef(null);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setIsSidebarOpen(false);
      }

      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isMobile, isNotificationOpen]);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const markNotificationsAsRead = () => {
    setUnreadCount(0);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getCurrentPageTitle = () => {
    // First try to find an exact match
    const exactMatch = sidebarLinks.find(link => location.pathname === link.path);
    if (exactMatch) {
      return exactMatch.label;
    }
    // If no exact match, find the parent route
    const parentRoute = sidebarLinks.find(link => 
      location.pathname.startsWith(link.path) && link.path !== '/admin'
    );
    
    // Special case for notifications page
    if (location.pathname === '/admin/notifications') {
      return 'Notifications';
    }
    
    return parentRoute?.label || "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("user");
    dispatch(LoggedOut());
    navigate("/");
  };

  const sidebarLinks = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { label: "Users Management", icon: <FaUsers />, path: "/admin/users" },
    {
      label: "Invest Management",
      icon: <FaMoneyBillWave />,
      path: "/admin/investments",
    },
    { label: "Profit Detail", icon: <FaChartLine />, path: "/admin/profits" },
    {
      label: "Profit Management",
      icon: <FaChartLine />,
      path: "/admin/profit-management",
    },
    { label: "Referal Users", icon: <FaUserFriends />, path: "/admin/referal" },
  ];

  const fetchNotifications = async () => {
    try {
      // const token = localStorage.getItem('mytoken');
      const response = await fetch(
        "http://localhost:8080/api/admin/notifications",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      console.log(data);
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (notification) => {
    try {
      // const token = localStorage.getItem('mytoken');
      const response = await fetch(
        `http://localhost:8080/api/admin/notifications/${notification._id}/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) throw new Error("Failed to mark notification as read");
      toast.success("successfully marked as read");
      fetchNotifications();
      if (notification.type === "investment") {
        navigate(`/admin/investments/${notification.relatedId}`);
        setIsNotificationOpen(false);
      } else if (notification.type === "profit") {
        navigate(`/admin/profits/${notification.relatedId}`);
        setIsNotificationOpen(false);
      } else if (notification.type === "withdrawal") {
        navigate(`/admin/withdrawals/${notification.relatedId}`);
        setIsNotificationOpen(false);
      } else if (notification.type === "register") {
        navigate(`/admin/users/${notification.relatedId}`);
        setIsNotificationOpen(false);
      }
      // Update local state to reflect the change
      // setNotifications(prevNotifications =>
      //   prevNotifications.map(notification =>
      //     notification._id === notificationId
      //       ? { ...notification, isRead: true }
      //       : notification
      //   )
      // );

      // // Decrease unread count
      // setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  useEffect(() => {
    // if (isNotificationOpen) {
    fetchNotifications();
    // }
  }, []);

  // Add polling for new notifications
  useEffect(() => {
    const pollInterval = setInterval(() => {
      // if (showNotificationPopover) {
        fetchNotifications();
      // }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [showNotificationPopover]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "investment":
        return (
          <FaMoneyCheckAlt className="text-2xl sm:text-xl text-blue-400" />
        );
      case "profit":
        return <FaChartLine className="text-2xl sm:text-xl text-green-400" />;
      case "withdrawal":
        return <FaWallet className="text-2xl sm:text-xl text-yellow-400" />;
      case "register":
        return <FaUserPlus className="text-2xl sm:text-xl text-red-400" />;
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

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="flex h-screen font-poppins bg-gradient-to-r from-black via-blue-950 to-black text-white overflow-hidden">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-20 flex flex-col border-r border-gray-800 shadow-2xl transition-all duration-300 ease-in-out bg-gradient-to-b from-black via-blue-950 to-black bg-opacity-95 ${
          isSidebarOpen
            ? "w-64 translate-x-0"
            : " -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="p-4 text-xl font-bold text-center border-b border-gray-800 flex justify-between items-center">
          <div className="w-full flex items-center flex-col justify-center">
            <img
              src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"
              className={`${
                isSidebarOpen ? "w-12 h-12 sm:w-16 sm:h-16" : "w-12 h-12"
              }`}
              alt="logo"
            />
            {isSidebarOpen && (
              <span className="uppercase text-[10px] sm:text-xs font-poppins text-white">
                {" "}
                Overland Solutions
              </span>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {sidebarLinks.map(({ label, icon, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 ${
                    !isSidebarOpen && "justify-center"
                  } rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300 ${
                    isActive ? "bg-blue-600" : ""
                  }`
                }
                end={path === "/admin"}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {icon}{" "}
                <span className={!isSidebarOpen && "hidden"}>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className={`w-full p-2 flex items-center ${
              !isSidebarOpen && "justify-center"
            } space-x-2 hover:bg-blue-500 transition-colors duration-300 rounded cursor-pointer`}
          >
            <FaSignOutAlt />{" "}
            <span className={!isSidebarOpen && "hidden"}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        } flex flex-col h-full overflow-hidden`}
      >
        {/* Header */}
        <header className="flex justify-between border-b border-gray-800 items-center shadow px-4 md:px-6 py-4 sticky top-0 z-10 bg-gradient-to-r from-black via-blue-950 to-black bg-opacity-95">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-400 text-xl hover:text-white transition-colors"
            >
              {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            <span className="text-xl md:text-2xl font-semibold text-white truncate">
              {getCurrentPageTitle()}
            </span>
          </div>

          {/* Notification Section */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                // setIsNotificationOpen(!isNotificationOpen);
                // if (!isNotificationOpen) {
                //   markNotificationsAsRead();
                // }
                navigate("/admin/notifications");
              }}
              className="relative p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <FaBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification, index) => (
                      <div
                        key={index}
                        onClick={() => markAsRead(notification)}
                        className="p-4 hover:bg-gray-800 border-b border-gray-800 cursor-pointer"
                      >
                        <div className="rounded-full text-white">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <p className="text-sm text-gray-300 font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          <h3 className="font-bold text-white">
                            {notification.type === "investment"
                              ? "DepositId"
                              : notification.type === "profit"
                              ? "ProfitId"
                              : notification.type === "withdrawal"
                              ? "WithdrawalId"
                              : notification.type === "register"
                              ? "UserId"
                              : ""}
                          </h3>{" "}
                          {notification.relatedId}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTimestamp(notification.createdAt)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 5 && (
                  <div className="p-4 border-t border-gray-800">
                    <button
                      onClick={() => {
                        navigate("/admin/notifications");
                        setIsNotificationOpen(false);
                      }}
                      className="w-full text-center text-sm text-blue-400 hover:text-blue-300"
                    >
                      View All
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 px-4 md:px-6 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Notification Popover */}
      {showNotificationPopover && (
        <div className="fixed top-[80px] right-4 w-96 bg-gradient-to-r from-black via-blue-950 to-black rounded-xl shadow-2xl backdrop-blur-lg bg-opacity-95 z-50 animate-slideIn">
          <div className="flex justify-between items-center border-b border-gray-800 p-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaBell className="mr-3 text-xl text-blue-400" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <FaTimes
              className="text-white text-xl cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => setShowNotificationPopover(false)}
            />
          </div>
          <div className="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 rounded-lg p-4 cursor-pointer transform hover:scale-[1.02] ${
                      !notification.isRead ? "border-l-4 border-blue-500" : ""
                    }`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-base truncate">
                          {notification.title}
                        </p>
                        <p className="text-gray-400 text-sm mt-1.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-gray-500 text-xs mt-2.5">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
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
    </div>
  );
};

export default AdminDashboardLayout;

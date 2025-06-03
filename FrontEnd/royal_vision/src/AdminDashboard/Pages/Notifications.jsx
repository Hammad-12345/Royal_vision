import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBell,
  FaCheck,
  FaSpinner,
  FaMoneyCheckAlt,
  FaChartLine,
  FaWallet,
  FaUserPlus,
} from "react-icons/fa";

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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/notifications"
      );
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up interval to fetch notifications every 3 seconds
    const intervalId = setInterval(fetchNotifications, 3000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const markAsRead = async (notification) => {
    try {
      const response = await fetch(
        `https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/notifications/${notification._id}/read`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
      toast.success("Notification marked as read");
      fetchNotifications();
      if (notification.type === "investment") {
        navigate(`/admin/investments/${notification.relatedId}`);
      } else if (notification.type === "profit") {
        navigate(`/admin/profits/${notification.relatedId}`);
      } else if (notification.type === "withdrawal") {
        navigate(`/admin/withdrawals/${notification.relatedId}`);
      } else if (notification.type === "register") {
        navigate(`/admin/users/${notification.relatedId}`);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading notifications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl mb-4">
          Error loading notifications
        </div>
        <button
          onClick={fetchNotifications}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-2 items-center justify-between mb-8">
          <div className="flex items-center">
            <FaBell className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {notifications.length}{" "}
            {notifications.length === 1 ? "notification" : "notifications"}
          </span>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => markAsRead(notification)}
                className="bg-gray-900  rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {formatTimestamp(notification.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-300">{notification.message}</p>
                    <div className="mt-2 flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:items-center text-sm text-gray-400">
                      <span className="inline-flex items-center px-2.5 py-0.5 self-start rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </span>
                      <span className="ml-2">ID: {notification.relatedId}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

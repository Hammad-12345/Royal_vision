import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaSignOutAlt, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoggedOut } from '../Redux/Slice/auth';

const AdminDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("user");
    dispatch(LoggedOut());
    navigate("/");
  };

  const sidebarLinks = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Investments", icon: <FaMoneyBillWave />, path: "/admin/investments" },
    { label: "Referal Users", icon: <FaUserFriends />, path: "/admin/referal" },
  ];

  return (
    <div className="flex h-screen font-poppins bg-gradient-to-r from-black via-blue-950 to-black text-white overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-20 flex flex-col border-r border-gray-800 shadow-2xl transition-all duration-300 bg-gradient-to-b from-black via-blue-950 to-black bg-opacity-95 ${
          isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 text-xl font-bold text-center border-b border-gray-800 flex justify-between items-center">
          <div className="flex-shrink-0 flex space-x-4 items-center">
            <span className="text-2xl font-bold text-white hover:text-blue-400 transition-colors font-poppins">
              Admin Panel
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {sidebarLinks.map(({ label, icon, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300 ${
                    isActive ? "bg-blue-600" : ""
                  }`
                }
                end={path === "/admin"}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                {icon} <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full p-2 flex items-center space-x-2 hover:bg-blue-500 transition-colors duration-300 rounded cursor-pointer"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        } flex flex-col h-full overflow-hidden`}
      >
        {/* Header */}
        <header className="flex justify-between border-b border-gray-800 items-center shadow px-4 md:px-6 py-4 sticky top-0 z-10 bg-gradient-to-r from-black via-blue-950 to-black bg-opacity-95">
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={toggleSidebar}
              className="text-gray-400 text-xl hover:text-white transition-colors"
            >
              <FaBars />
            </button> */}
            <span className="text-xl md:text-2xl font-semibold text-white truncate">
              {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || "Dashboard"}
            </span>
          </div>
        </header>

        <div className="flex-1 px-4 md:px-6 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout; 
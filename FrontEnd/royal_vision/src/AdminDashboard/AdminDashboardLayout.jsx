import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft, FaSignOutAlt, FaTachometerAlt, FaUsers, FaMoneyBillWave, FaUserFriends, FaChartLine } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoggedOut } from '../Redux/Slice/auth';

const AdminDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const sidebarRef = useRef(null);

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
      if (isMobile && 
          isSidebarOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('button')) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("user");
    dispatch(LoggedOut());
    navigate("/");
  };

  const sidebarLinks = [
    { label: "Dashboard", icon: <FaTachometerAlt/>, path: "/admin" },
    { label: "Users Management", icon: <FaUsers />, path: "/admin/users" },
    { label: "Invest Management", icon: <FaMoneyBillWave />, path: "/admin/investments" },
    { label: "Profit Detail", icon: <FaChartLine />, path: "/admin/profits" },
    { label: "Profit Management", icon: <FaChartLine />, path: "/admin/profit-management" },
    { label: "Referal Users", icon: <FaUserFriends />, path: "/admin/referal" },
  ];

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
          isSidebarOpen ? "w-64 translate-x-0" : " -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="p-4 text-xl font-bold text-center border-b border-gray-800 flex justify-between items-center">
          <div className="w-full flex items-center flex-col justify-center">
            <img
              src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"
              className={`${isSidebarOpen ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-12 h-12'}`}
              alt="logo"
            />
            {isSidebarOpen && <span className="uppercase text-[10px] sm:text-xs font-poppins text-white"> Overland Solutions</span>}
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {sidebarLinks.map(({ label, icon, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 ${!isSidebarOpen && 'justify-center'} rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300 ${
                    isActive ? "bg-blue-600" : ""
                  }`
                }
                end={path === "/admin"}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {icon} <span className={!isSidebarOpen && 'hidden'}>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className={`w-full p-2 flex items-center ${!isSidebarOpen && 'justify-center'} space-x-2 hover:bg-blue-500 transition-colors duration-300 rounded cursor-pointer`}
          >
            <FaSignOutAlt /> <span className={!isSidebarOpen && 'hidden'}>Logout</span>
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
              {sidebarLinks.find(link => link.path === location.pathname)?.label || "Dashboard"}
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
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-blue-950 to-black text-white font-poppins">
      <div className="w-64 p-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-poppins font-bold">Admin Panel</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/investments" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
              >
                Investments
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/profits" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
              >
                Daily Profits
              </NavLink>
            </li>
            {/* <li>
              <NavLink 
                to="/admin/plans" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
              >
                Investment Plans
              </NavLink>
            </li> */}
            <li>
              <NavLink 
                to="/admin/withdrawals" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-900' : 'hover:bg-blue-900'}`
                }
              >
                Withdrawals
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout; 
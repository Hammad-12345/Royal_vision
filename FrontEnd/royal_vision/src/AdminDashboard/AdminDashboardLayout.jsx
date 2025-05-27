import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-blue-950 to-black text-white font-poppins">
      <div className="fixed w-64 h-full  bg-gradient-to-r from-black via-blue-950 to-black border-r border-gray-400">
        <div className="mb-8 text-center border-b border-gray-400 pb-4 py-4">
          <h2 className="text-2xl font-poppins font-bold">Admin Panel</h2>
        </div>
        <nav className='px-4'>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
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
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/investments" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
                }
              >
                Investments
              </NavLink>
            </li>
            {/* <li>
              <NavLink 
                to="/admin/profits" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
                }
              >
                Daily Profits
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink 
                to="/admin/plans" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
                }
              >
                Investment Plans
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink 
                to="/admin/withdrawals" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg transition-colors border border-transparent ${isActive ? 'bg-blue-900 border-blue-700' : 'hover:bg-blue-900 hover:border-blue-700'}`
                }
              >
                Withdrawals
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className="flex-1 ml-64 p-8 bg-gradient-to-r from-black via-blue-950 to-black">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout; 
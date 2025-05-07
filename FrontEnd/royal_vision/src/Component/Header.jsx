import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About us' },
    { path: '/contact', label: 'Contact us' },
    { path: '/plans', label: 'Plans' },
    { path: '/news', label: 'Blogs' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full text-white shadow-lg z-50 bg-gradient-to-r from-black via-blue-950 to-pink">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors font-poppins">
              Royal Vision
            </Link>
          </div>

          {/* Navbar Section */}
          <nav className="hidden md:flex space-x-12 font-poppins">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white relative group ${
                  isActive(link.path)
                    ? 'text-blue-200'
                    : 'hover:text-blue-200'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 transform ${
                  isActive(link.path)
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                } transition-transform duration-300`}></span>
              </Link>
            ))}
          </nav>

          {/* Login Button Section */}
          <div className="flex items-center">
            <button className="bg-white/20 text-white px-6 py-2 rounded-md hover:bg-white/30 transition-colors duration-300 font-['Poppins'] backdrop-blur-sm border border-white/20">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

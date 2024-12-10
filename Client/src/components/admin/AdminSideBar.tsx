import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaCreditCard, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

import toast from 'react-hot-toast';

const ProfileSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    toast.success('Logged out successfully');
    navigate('/admin');
  };

  return (
    <div className="h-screen bg-white text-black flex flex-col justify-between p-4 fixed md:w-64 w-20 transition-all duration-300 shadow-md">
      <div>
        <div className="text-2xl font-bold mb-5 hidden md:block text-center">Profile</div>
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg transition-colors duration-200 ${
                location.pathname === '/admin/dashboard'
                  ? 'bg-gray-800 text-white'
                  : 'text-black hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <FaTachometerAlt className="md:mr-2" />
              <span className="hidden md:block">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/user"
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg transition-colors duration-200 ${
                location.pathname === '/admin/user'
                  ? 'bg-gray-800 text-white'
                  : 'text-black hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <FaUser className="md:mr-2" />
              <span className="hidden md:block">User</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/property"
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg transition-colors duration-200 ${
                location.pathname === '/admin/property'
                  ? 'bg-gray-800 text-white'
                  : 'text-black hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <FaHome className="md:mr-2" />
              <span className="hidden md:block">Property</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/subscription"
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg transition-colors duration-200 ${
                location.pathname === '/admin/subscription'
                  ? 'bg-gray-800 text-white'
                  : 'text-black hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <FaCreditCard className="md:mr-2" />
              <span className="hidden md:block">Subscription</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center py-2 my-4 px-4 rounded-lg text-black hover:bg-gray-200 hover:text-gray-900"
        >
          <FaSignOutAlt className="md:mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
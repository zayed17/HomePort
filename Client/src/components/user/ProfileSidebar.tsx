import React from 'react';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaMapMarkerAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { Tooltip } from 'antd';
import { useAuth } from '../../hooks/useAuth';

const ProfileSidebar: React.FC = () => {
  const { logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout successfully'); 
    navigate('/');
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#1e293b] to-[#0a0f23] text-white flex flex-col justify-between p-4 fixed md:w-64 w-20 transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold mb-5 hidden md:block">HomePort</div>
        <ul className="w-full">
          {[
            { to: '/profile/details', icon: FaUser, label: 'User Details' },
            { to: '/profile/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
            { to: '/profile/properties', icon: FaHome, label: 'Properties' },
            { to: '/profile/booked', icon: FaMapMarkerAlt, label: 'Booked' },
          ].map(({ to, icon: Icon, label }) => (
            <li className="my-6" key={to}>
              <NavLink 
                to={to}
                className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${
                  location.pathname === to ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'
                }`}
              >
                <Tooltip title={label} placement="right" overlayClassName="md:hidden">
                  <Icon className="md:mr-2" />
                </Tooltip>
                <span className="hidden md:block">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="w-full flex items-center py-2 my-4 px-4 rounded-lg text-white hover:bg-DarkBlue hover:text-white"
        >
          <Tooltip title="Logout" placement="right" overlayClassName="md:hidden">
            <FaSignOutAlt className="md:mr-2" />
          </Tooltip>
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;

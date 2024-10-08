import React from 'react';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaMapMarkerAlt, FaSignOutAlt ,FaTachometerAlt} from 'react-icons/fa'; 
import { useAuth } from '../../hooks/useAuth';

const ProfileSidebar: React.FC = () => {
  const {  logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    toast.success('Logout successfully'); 
    navigate('/');
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#1e293b] to-[#0a0f23] text-white flex flex-col justify-between p-4 fixed md:w-64 w-20 transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold mb-5 hidden md:block">Profile</div>
        <ul className="w-full">
          <li className="my-6">
            <NavLink 
              to="/profile/details" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${location.pathname === '/profile/details' ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'}`}
            >
              <FaUser className="md:mr-2" />
              <span className="hidden md:block">User Details</span>
            </NavLink>
          </li>
          <li className="my-6">
            <NavLink 
              to="/profile/dashboard" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${location.pathname === '/profile/dashboard' ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'}`}
            >
              <FaTachometerAlt className="md:mr-2" />
              <span className="hidden md:block">dashboard</span>
            </NavLink>
          </li>
          <li className="my-6">
            <NavLink 
              to="/profile/properties" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${location.pathname === '/profile/properties' ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'}`}
            >
              <FaHome className="md:mr-2" />
              <span className="hidden md:block">Properties</span>
            </NavLink>
          </li>
          {/* <li className="my-6">
            <NavLink 
              to="/profile/ads" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${location.pathname === '/profile/ads' ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'}`}
            >
              <FaAd className="md:mr-2" />
              <span className="hidden md:block">ADs </span>
            </NavLink>
          </li> */}

          <li className="my-6">
            <NavLink 
              to="/profile/booked" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-lg ${location.pathname === '/profile/booked' ? 'bg-DarkBlue text-white' : 'text-white hover:bg-DarkBlue hover:text-white'}`}
            >
              <FaMapMarkerAlt className="md:mr-2" />
              <span className="hidden md:block">Booked</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="flex items-center py-2 my-4 px-4 rounded-lg text-white hover:bg-DarkBlue hover:text-white"
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
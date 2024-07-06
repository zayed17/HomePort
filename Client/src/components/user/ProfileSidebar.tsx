import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaUser, FaHeart, FaCreditCard, FaComments } from 'react-icons/fa';

const ProfileSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-screen bg-[#161b33] text-white flex flex-col justify-between p-4 fixed md:w-64 w-20 transition-all duration-300">
      <div>
        <div className="text-2xl font-bold mb-5 hidden md:block">Profile</div>
        <ul>
          <li className="my-6">
            <NavLink 
              to="/profile/details" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-full ${location.pathname === '/profile/details' ? 'bg-LightdarkBlue text-white' : 'bg-white text-black'}`}
            >
              <FaUser className="md:mr-2" />
              <span className="hidden md:block">User Details</span>
            </NavLink>
          </li>
          <li className="my-6">
            <NavLink 
              to="/profile/favorite" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-full text-black ${location.pathname === '/profile/favorite' ? 'bg-LightdarkBlue text-white' : 'text-black bg-white'}`}
            >
              <FaHeart className="md:mr-2" />
              <span className="hidden md:block">Favorite</span>
            </NavLink>
          </li>
          <li className="my-6">
            <NavLink 
              to="/profile/payment" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-full text-black ${location.pathname === '/profile/payment' ? 'bg-LightdarkBlue text-white' : 'text-black bg-white'}`}
            >
              <FaCreditCard className="md:mr-2" />
              <span className="hidden md:block">Payment</span>
            </NavLink>
          </li>
          <li className="my-6">
            <NavLink 
              to="/profile/chat" 
              className={`w-full flex items-center py-2 my-4 px-4 rounded-full text-black ${location.pathname === '/profile/chat' ? 'bg-LightdarkBlue text-white' : 'text-black bg-white'}`}
            >
              <FaComments className="md:mr-2" />
              <span className="hidden md:block">Chat</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;

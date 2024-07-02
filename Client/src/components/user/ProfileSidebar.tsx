import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaCreditCard, FaComments } from 'react-icons/fa';



const ProfileSidebar: React.FC = () => {
 

  return (
    <div className="h-screen bg-[#161b33] text-white flex flex-col justify-between p-4 fixed md:w-64 w-20 transition-all duration-300">
      <div>
        <div className="text-2xl font-bold mb-4 hidden md:block">Profile</div>
        <ul>
          <li className="mb-2">
            <Link 
              to="/profile/details"
              className="w-full flex items-center py-2 my-4 px-4 rounded-full bg-[#a69cac] hover:bg-[#928aa7] transition-all duration-300"
            >
              <FaUser className="md:mr-2" />
              <span className="hidden md:block">User Details</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/profile/favorite"
              className="w-full flex items-center py-2 my-4 px-4 rounded-full bg-[#a69cac] hover:bg-[#928aa7] transition-all duration-300"
            >
              <FaHeart className="md:mr-2" />
              <span className="hidden md:block">Favorite</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/profile/payment"
              className="w-full flex items-center py-2 my-4 px-4 rounded-full bg-[#a69cac] hover:bg-[#928aa7] transition-all duration-300"
            >
              <FaCreditCard className="md:mr-2" />
              <span className="hidden md:block">Payment</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/profile/chat"
              className="w-full flex items-center py-2 my-4 px-4 rounded-full bg-[#a69cac] hover:bg-[#928aa7] transition-all duration-300"
            >
              <FaComments className="md:mr-2" />
              <span className="hidden md:block">Chat</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;



import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileNav: React.FC = () => {
  return (
    <div className="bg-white text-white p-3 flex justify-between items-center">
      <div className="text-xl font-bold">Brand Name</div>
      <Link to="/" className="flex items-center bg-DarkBlue text-white py-2 px-4 rounded hover:bg-[#373759]">
        <FaArrowLeft className="mr-2" />
        Go Back
      </Link>
    </div>
  );
};

export default ProfileNav;

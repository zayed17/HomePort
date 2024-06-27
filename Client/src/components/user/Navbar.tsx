import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from '../common/LoginModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };



  return (
    <nav className="bg-customRed text-white px-4 py-2 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/">Brand</Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="#" onClick={openLoginModal} className="block mt-4 md:inline-block md:mt-0 md:ml-4">
          Login
        </Link>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  );
};

export default Navbar;

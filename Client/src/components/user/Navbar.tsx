import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from '../common/LoginModal';
import '../../style/loader.css';
import { getCookie } from '../../helpers/getCookie';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const token = getCookie('token')
  console.log(token)
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileOrLoginClick = () => {
    if (token) {
      navigate('/profile/details');
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 750) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-LightdarkBlue text-white px-4 py-1 flex justify-between items-center transition-all duration-300 ${isFixed ? 'fixed top-0 w-full z-50 shadow-lg' : 'relative'}`}>
      <div className="text-lg font-semibold">
        <Link to="/" className="hover:text-gray-300">
          Brand
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <div className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-LightdarkBlue md:bg-transparent md:static`}>
        <button onClick={handleProfileOrLoginClick} className="bg-white text-LightdarkBlue rounded-full px-5 py-2 font-semibold focus:outline-none m-2">
          {token ? 'Profile' : 'Register'}
        </button>
       {token &&  <Link to="/addproperty" className="border text-white rounded-full px-5 py-2 font-semibold focus:outline-none m-2">
          Sell/Rent Property
        </Link>}
        <Link to="/properties" className="hover:text-gray-300">
          Property
        </Link>
        <Link to="/favourites" className="hover:text-gray-300">
          favourites
        </Link>
        <Link to="/subscription" className="hover:text-gray-300">
          Subscription
        </Link>
      </div>

      {isOpen && !token && <LoginModal isOpen={isOpen} onClose={toggleMenu} />}
    </nav>
  );
};

export default Navbar;
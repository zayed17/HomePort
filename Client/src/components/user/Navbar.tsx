// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import LoginModal from '../common/LoginModal';
// import { getCookie } from '../../helpers/getCookie';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const token = getCookie('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleProfileOrLoginClick = () => {
//     if (token) {
//       navigate('/profile/details');
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const navItems = [
//     { to: '/properties', text: 'Properties' },
//     { to: '/favourites', text: 'Favourites', requiresAuth: true },
//     { to: '/subscription', text: 'Subscription' },
//     { to: '/chat', text: 'Chat' },
//   ];

//   const buttonClass = "w-full md:w-auto bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-100 text-center mb-2 md:mb-0";
//   const linkClass = "block py-2 hover:text-gray-200 transition-colors duration-200";

//   return (
//     <nav className="bg-LightdarkBlue text-white px-4 sm:px-6 py-3 fixed top-0 w-full z-50 shadow-md transition-all duration-300">
//       <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
//         <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
//           Brand
//         </Link>

//         <button 
//           onClick={toggleMenu} 
//           className="text-2xl md:hidden focus:outline-none hover:text-gray-200 transition-colors duration-200"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <div className={`w-full md:w-auto md:flex items-center ${isMenuOpen ? 'flex flex-col' : 'hidden'} md:flex-row md:space-x-4 mt-4 md:mt-0`}>
//           <button onClick={handleProfileOrLoginClick} className={buttonClass}>
//             {token ? 'Profile' : 'Register'}
//           </button>

//           {token && (
//             <Link to="/addproperty" className={buttonClass}>
//               Sell/Rent Property
//             </Link>
//           )}

//           {navItems.map((item, index) => (
//             (!item.requiresAuth || token) && (
//               <Link key={index} to={item.to} className={linkClass}>
//                 {item.text}
//               </Link>
//             )
//           ))}
//         </div>
//       </div>

//       {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
//     </nav>
//   );
// };

// export default Navbar;


import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BellOutlined } from '@ant-design/icons';
import { Badge, notification } from 'antd';
import useSocket from '../../hooks/useSocket';
import LoginModal from '../common/LoginModal';
import { getCookie } from '../../helpers/getCookie';
import {  removeCookie } from '../../helpers/removeCookie';  
import NotificationDrawer from './NotificationDrawer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const token = getCookie('token');
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadNotificationCount();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  
  useEffect(() => {
    if (!socket) return;

    socket.on('adminBlocked', () => {
      removeCookie('token');
      notification.error({
        message: 'Access Denied',
        description: 'Your account has been blocked by the admin.',
        placement: 'topRight',
        duration: 4,
      });
      navigate('/');
    });

    return () => {
      socket.off('adminBlocked');
    };
  }, [socket, navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNotificationClick = () => setIsNotificationOpen(true);
  const handleProfileOrLoginClick = () => token ? navigate('/profile/details') : setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeNotificationDrawer = () => setIsNotificationOpen(false);

  const loadNotificationCount = () => {
    const storedNotifications = localStorage.getItem('propertyNotifications');
    if (storedNotifications) {
      setNotificationCount(JSON.parse(storedNotifications).length);
    }
  };

  const handleStorageChange = (e :any) => {
    if (e.key === 'propertyNotifications') {
      loadNotificationCount();
    }
  };

  const navItems = [
    { to: '/properties', text: 'Properties' },
    { to: '/favourites', text: 'Favourites', requiresAuth: true },
    { to: '/subscription', text: 'Subscription' },
    { to: '/chat', text: 'Chat' },
  ];

  return (
    <nav className="bg-LightdarkBlue text-white fixed top-0 w-full z-50 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
            Brand
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              (!item.requiresAuth || token) && (
                <Link key={index} to={item.to} className="hover:text-gray-200 transition-colors duration-200">
                  {item.text}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={handleProfileOrLoginClick} className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold hover:bg-gray-100 transition-colors duration-200">
              {token ? 'Profile' : 'Register'}
            </button>
            {token && (
              <Link to="/addproperty" className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold hover:bg-gray-100 transition-colors duration-200">
                Sell/Rent Property
              </Link>
            )}
            <Badge count={notificationCount} offset={[-5, 5]}>
              <button onClick={handleNotificationClick} className="text-xl hover:text-gray-200 transition-colors duration-200">
                <BellOutlined className='text-white text-2xl' />
              </button>
            </Badge>
          </div>

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-2xl focus:outline-none hover:text-gray-200 transition-colors duration-200"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              (!item.requiresAuth || token) && (
                <Link key={index} to={item.to} className="hover:text-gray-200 transition-colors duration-200">
                  {item.text}
                </Link>
              )
            ))}
            <button onClick={handleProfileOrLoginClick} className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold hover:bg-gray-100 transition-colors duration-200 text-center">
              {token ? 'Profile' : 'Register'}
            </button>
            {token && (
              <Link to="/addproperty" className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold hover:bg-gray-100 transition-colors duration-200 text-center">
                Sell/Rent Property
              </Link>
            )}
            <Badge count={notificationCount} offset={[-5, 5]}>
              <button onClick={handleNotificationClick} className="text-xl hover:text-gray-200 transition-colors duration-200">
                <BellOutlined />
              </button>
            </Badge>
          </div>
        </div>
      </div>

      {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
      <NotificationDrawer 
        open={isNotificationOpen} 
        onClose={closeNotificationDrawer}
        onNotificationsChange={loadNotificationCount}
      />
    </nav>
  );
};

export default Navbar;
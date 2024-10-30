// import  { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaHome, FaHeart, FaCrown, FaComments, FaUser, FaPlus } from 'react-icons/fa';
// import { BellOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
// import { Badge, notification, Dropdown } from 'antd';
// import useSocket from '../../hooks/useSocket';
// import LoginModal from '../common/LoginModal';  
// import NotificationDrawer from './NotificationDrawer';
// import { useAuth } from '../../hooks/useAuth';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store'; 
// import toast from 'react-hot-toast';


// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(0);

//   const socket = useSocket();
//   const navigate = useNavigate();
//   const {  logout } = useAuth(); 
//   const {  isAuthenticated } = useSelector((state: RootState) => state.auth);
//   useEffect(() => {
//     const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


//   useEffect(() => {
//     loadNotificationCount();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);



//   const handleLogout = () => {
//     logout();
//     toast.success('Logout successfully'); 
//   };

//   useEffect(() => {
//     if (!socket) return;
//     socket.on('adminBlocked', handleAdminBlocked);
//     return () => {
//       socket.off('adminBlocked');
//     };
//   }, [socket, navigate]);

//   const handleAdminBlocked = () => {  
//     logout();
//     notification.error({
//       message: 'Access Denied',
//       description: 'Your account has been blocked by the admin.',
//       placement: 'topRight',
//       duration: 4,
//     });
//     navigate('/');
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const handleNotificationClick = () => setIsNotificationOpen(true);
//   const handleProfileOrLoginClick = () => isAuthenticated ? navigate('/profile/details') : setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const closeNotificationDrawer = () => setIsNotificationOpen(false);

//   const loadNotificationCount = () => {
//     const storedNotifications = localStorage.getItem('propertyNotifications');
//     if (storedNotifications) {
//       setNotificationCount(JSON.parse(storedNotifications).length);
//     }
//   };

//   const handleStorageChange = (event: any) => {
//     if (event.key === 'propertyNotifications') {
//       loadNotificationCount();
//     }
//   };
//   const navItems = [
//     { to: '/properties', text: 'Properties', icon: <FaHome className="w-5 h-5" /> },
//     { to: '/favourites', text: 'Favourites', icon: <FaHeart className="w-5 h-5" />, requiresAuth: true },
//     { to: '/subscription', text: 'Subscription', icon: <FaCrown className="w-5 h-5" /> },
//     { to: '/chat', text: 'Chat', icon: <FaComments className="w-5 h-5" /> },
//   ];

//   const userMenu = (
//     <div className="bg-white rounded-md shadow-lg py-2">
//       <button onClick={() => navigate('/profile/details')} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
//         <FaUser className="w-5 h-5 text-BlueGray" />
//         <span className="text-BlueGray">Profile</span>
//       </button>
//       <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
//         <CloseOutlined className="w-5 h-5 text-BlueGray" />
//         <span className="text-BlueGray">Logout</span>
//       </button>
//     </div>
//   );

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-BlueGray text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2 transition-opacity duration-200">
//             <span className="text-2xl font-bold text-white">HomePort</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item, index) => (
//               (!item.requiresAuth || isAuthenticated) && (
//                 <Link key={index} to={item.to} className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
//                   {item.icon}
//                   <span>{item.text}</span>
//                 </Link>
//               )
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
//                   <button className="bg-white text-BlueGray rounded-full px-4 py-2 font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
//                     <FaUser className="w-5 h-5" />
//                     <span>Profile</span>
//                   </button>
//                 </Dropdown>
//                 <Link to="/addproperty" className="bg-GrayishBlue text-white rounded-full px-4 py-2 font-semibold transition-colors duration-200 flex items-center space-x-2 hover:bg-opacity-90">
//                   <FaPlus className="w-5 h-5" />
//                   <span>Add Property</span>
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleProfileOrLoginClick} className="bg-white text-BlueGray rounded-full px-4 py-2 font-semibold hover:bg-gray-200 transition-colors duration-200">
//                 Register
//               </button>
//             )}
//             <Badge count={notificationCount} offset={[-5, 5]}>
//               <button onClick={handleNotificationClick} className="text-xl text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20">
//                 <BellOutlined className="text-2xl" />
//               </button>
//             </Badge>
//           </div>

//           <button 
//             onClick={toggleMenu} 
//             className="md:hidden text-2xl text-white focus:outline-none hover:text-gray-300 transition-colors duration-200"
//           >
//             {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-4 right-4 top-16`}>
//           <div className="flex flex-col space-y-3">
//             {navItems.map((item, index) => (
//               (!item.requiresAuth || isAuthenticated) && (
//                 <Link key={index} to={item.to} className="flex items-center space-x-2 text-BlueGray hover:text-gray-600 transition-colors duration-200 py-2">
//                   {item.icon}
//                   <span>{item.text}</span>
//                 </Link>
//               )
//             ))}
//             {isAuthenticated ? (
//               <>
//                 <Link to="/profile/details" className="flex items-center space-x-2 text-BlueGray hover:text-gray-600 transition-colors duration-200 py-2">
//                   <FaUser className="w-5 h-5" />
//                   <span>Profile</span>
//                 </Link>
//                 <Link to="/addproperty" className="flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-200 py-2">
//                   <FaPlus className="w-5 h-5" />
//                   <span>Add Property</span>
//                 </Link>
//               </>
//             ) : (
//               <button onClick={handleProfileOrLoginClick} className="flex items-center space-x-2 text-BlueGray hover:text-gray-600 transition-colors duration-200 py-2">
//                 <FaUser className="w-5 h-5" />
//                 <span>Register</span>
//               </button>
//             )}
//             <button onClick={handleNotificationClick} className="flex items-center space-x-2 text-BlueGray hover:text-gray-600 transition-colors duration-200 py-2">
//               <BellOutlined className="w-5 h-5" />
//               <span>Notifications</span>
//               {notificationCount > 0 && (
//                 <Badge count={notificationCount} className="ml-2" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={closeModal} />}
//       <NotificationDrawer 
//         open={isNotificationOpen} 
//         onClose={closeNotificationDrawer}
//         onNotificationsChange={loadNotificationCount}
//       />
//     </nav>
//   );
// };
// export default Navbar;



import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, User, Plus } from 'lucide-react';
import useSocket from '../../hooks/useSocket';
import LoginModal from '../common/LoginModal';
import NotificationDrawer from './NotificationDrawer';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const socket = useSocket();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadNotificationCount();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // const handleLogout = () => {
  //   logout();
  //   toast.success('Logout successfully');
  // };

  useEffect(() => {
    if (!socket) return;
    socket.on('adminBlocked', handleAdminBlocked);
    return () => {
      socket.off('adminBlocked');
    };
  }, [socket, navigate]);

  const handleAdminBlocked = () => {
    logout();
    toast.error('Your account has been blocked by the admin.');
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNotificationClick = () => setIsNotificationOpen(true);
  const handleProfileOrLoginClick = () => isAuthenticated ? navigate('/profile/details') : setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeNotificationDrawer = () => setIsNotificationOpen(false);

  const loadNotificationCount = () => {
    const storedNotifications = localStorage.getItem('propertyNotifications');
    if (storedNotifications) {
      setNotificationCount(JSON.parse(storedNotifications).length);
    }
  };

  const handleStorageChange = (event: any) => {
    if (event.key === 'propertyNotifications') {
      loadNotificationCount();
    }
  };

  const navItems = [
    { to: '/properties', text: 'Properties' },
    { to: '/subscription', text: 'Subscription' },
    { to: '/chat', text: 'Chat' },
    { to: '/about', text: 'About' },
  ];

  return (
    <nav className="bg-BlueGray text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 transition-opacity duration-200">
            <span className="text-2xl font-bold">HomePort</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-white text-sm ">
                {item.text}
              </Link>
            ))}
          </div>


          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button onClick={handleProfileOrLoginClick} className="bg-GrayishBlue text-white rounded-md px-4 py-2 font-medium ">
                  <User className="w-5 h-5 inline" />
                  <span>Profile</span>
                </button>
                <Link to="/addproperty" className="bg-GrayishBlue text-whit rounded-md px-4 py-2 font-medium ">
                  <Plus className="w-5 h-5 inline" />
                  <span>Add Property</span>
                </Link>
              </>
            ) : (
              <button onClick={handleProfileOrLoginClick} className="bg-GrayishBlue text-white rounded-md px-4 py-2 font-medium ">
                Register
              </button>
            )}
            <div className="relative">
              <button onClick={handleNotificationClick} className="text-xl text-white  p-2 rounded-full hover:bg-GrayishBlue">
                <Bell className="w-6 h-6" />
              </button>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{notificationCount}</span>
              )}
            </div>
          </div>

          <button onClick={toggleMenu} className="md:hidden text-2xl text-white focus:outline-none hover:text-gray-300 transition-colors duration-200" >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} bg-white rounded-lg shadow-lg mt-4 p-4 absolute left-4 right-4 top-16 z-50`}>
          <div className="flex flex-col divide-y divide-gray-200">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="text-GrayishBlue py-3 text-lg font-medium hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                {item.text}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link to="/profile/details" className="text-GrayishBlue flex items-center gap-2 py-3 text-lg font-medium hover:bg-gray-100 rounded-md transition-colors duration-200">
                  Profile
                </Link>
                <Link to="/addproperty" className="text-GrayishBlue flex items-center gap-2 py-3 text-lg font-medium hover:bg-gray-100 rounded-md transition-colors duration-200">
                  Add Property
                </Link>
              </>
            ) : (
              <button
                onClick={handleProfileOrLoginClick}
                className="text-GrayishBlue flex items-center gap-2 py-3 text-lg font-medium hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Register
              </button>
            )}

            <button
              onClick={handleNotificationClick}
              className="text-GrayishBlue flex items-center gap-2 py-3 text-lg font-medium hover:bg-gray-100 rounded-md transition-colors duration-200 relative"
            >
              Notifications
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      <NotificationDrawer open={isNotificationOpen} onClose={closeNotificationDrawer}   onNotificationsChange={loadNotificationCount} />
    </nav>
  );
};

export default Navbar;


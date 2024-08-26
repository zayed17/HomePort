// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import LoginModal from '../common/LoginModal';
// import { getCookie } from '../../helpers/getCookie';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const token = getCookie('token');
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleProfileOrLoginClick = () => {
//     if (token) {
//       navigate('/profile/details');
//     } else {
//       setIsOpen(true);
//     }
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50 shadow-md transition-all duration-300">
//       <div className="text-lg font-bold">
//         <Link to="/" className="hover:text-gray-200">
//           Brand
//         </Link>
//       </div>

//       <div className="md:hidden flex items-center">
//         <button onClick={toggleMenu} className="text-2xl focus:outline-none">
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 md:bg-transparent md:static md:top-auto md:space-x-8`}>
//         <button 
//           onClick={handleProfileOrLoginClick}
//           className="bg-white text-blue-600 rounded-full px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-100"
//         >
//           {token ? 'Profile' : 'Register'}
//         </button>

//         {token && (
//           <Link to="/addproperty" className="bg-white text-blue-600 rounded-full px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-100">
//             Sell/Rent Property
//           </Link>
//         )}

//         <Link to="/properties" className="hover:text-gray-200">
//           Properties
//         </Link>
//         <Link to="/favourites" className="hover:text-gray-200">
//           Favourites
//         </Link>
//         <Link to="/subscription" className="hover:text-gray-200">
//           Subscription
//         </Link>
//         <Link to="/chat" className="hover:text-gray-200">
//           Chat
//         </Link>
//       </div>

//       {isOpen && !token && <LoginModal isOpen={isOpen} onClose={toggleMenu} />}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Button, Avatar, Badge } from 'antd';
import { 
  HomeOutlined, 
  HeartOutlined, 
  CrownOutlined, 
  MessageOutlined,
  UserOutlined,
  PlusOutlined,
  BellOutlined,
  MenuOutlined
} from '@ant-design/icons';
import LoginModal from '../common/LoginModal';
import { getCookie } from '../../helpers/getCookie';

const Navbar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState('');
  const token = getCookie('token');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const handleProfileOrLoginClick = () => {
    if (token) {
      navigate('/profile/details');
    } else {
      setIsModalVisible(true);
    }
  };

  const menu = (
    <Menu className="mt-2 rounded-lg shadow-lg">
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile/details">Profile</Link>
      </Menu.Item>
      <Menu.Item key="addProperty" icon={<PlusOutlined />}>
        <Link to="/addproperty">Sell/Rent Property</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  const mobileMenu = (
    <Menu mode="vertical" className="rounded-lg shadow-lg">
      <Menu.Item key="/properties" icon={<HomeOutlined />}>
        <Link to="/properties">Properties</Link>
      </Menu.Item>
      <Menu.Item key="/favourites" icon={<HeartOutlined />}>
        <Link to="/favourites">Favourites</Link>
      </Menu.Item>
      <Menu.Item key="/subscription" icon={<CrownOutlined />}>
        <Link to="/subscription">Subscription</Link>
      </Menu.Item>
      <Menu.Item key="/chat" icon={<MessageOutlined />}>
        <Link to="/chat">Chat</Link>
      </Menu.Item>
      {token ? (
        <>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile/details">Profile</Link>
          </Menu.Item>
          <Menu.Item key="addProperty" icon={<PlusOutlined />}>
            <Link to="/addproperty">Sell/Rent Property</Link>
          </Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" onClick={() => setIsModalVisible(true)}>
          Login/Register
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white mr-8 hover:text-gray-200 transition-colors">
              Brand
            </Link>
            <Menu 
              onClick={handleClick} 
              selectedKeys={[current]} 
              mode="horizontal" 
              className="bg-transparent border-0 hidden lg:flex"
            >
              <Menu.Item key="/properties" icon={<HomeOutlined />}>
                <Link to="/properties" className="text-white hover:text-gray-200 transition-colors">Properties</Link>
              </Menu.Item>
              <Menu.Item key="/favourites" icon={<HeartOutlined />}>
                <Link to="/favourites" className="text-white hover:text-gray-200 transition-colors">Favourites</Link>
              </Menu.Item>
              <Menu.Item key="/subscription" icon={<CrownOutlined />}>
                <Link to="/subscription" className="text-white hover:text-gray-200 transition-colors">Subscription</Link>
              </Menu.Item>
              <Menu.Item key="/chat" icon={<MessageOutlined />}>
                <Link to="/chat" className="text-white hover:text-gray-200 transition-colors">Chat</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="flex items-center space-x-4">
            <Badge count={5} className="hidden sm:block">
              <Button 
                icon={<BellOutlined />} 
                shape="circle" 
                size="large"
                className="flex items-center justify-center bg-white text-blue-500 border-0 shadow-md hover:bg-gray-100 transition-colors"
              />
            </Badge>
            {token ? (
              <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
                <Avatar 
                  size="large" 
                  icon={<UserOutlined />} 
                  className="cursor-pointer bg-white text-blue-500 hover:bg-gray-100 transition-colors"
                />
              </Dropdown>
            ) : (
              <Button 
                onClick={handleProfileOrLoginClick}
                type="primary" 
                shape="round" 
                size="large"
                className="bg-white text-blue-500 border-0 hover:bg-gray-100 hover:text-blue-600 transition-colors shadow-md"
              >
                Login / Register
              </Button>
            )}
            <Dropdown overlay={mobileMenu} placement="bottomRight" trigger={['click']} className="lg:hidden">
              <Button 
                icon={<MenuOutlined />} 
                shape="circle" 
                size="large"
                className="flex items-center justify-center bg-white text-blue-500 border-0 shadow-md hover:bg-gray-100 transition-colors"
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </nav>
  );
};

export default Navbar;
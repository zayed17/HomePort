import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from '../common/LoginModal';
import { getCookie } from '../../helpers/getCookie';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = getCookie('token');
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

  return (
    <nav className="bg-LightdarkBlue text-white px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50 shadow-lg transition-all duration-300">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-300">
          Brand
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 bg-LightdarkBlue md:bg-transparent md:static md:top-auto md:space-x-8`}>
        <button 
          onClick={handleProfileOrLoginClick}
          className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-200 md:ml-2"
        >
          {token ? 'Profile' : 'Register'}
        </button>

        {token && (
          <Link to="/addproperty" className="bg-white text-LightdarkBlue rounded-full px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-200">
            Sell/Rent Property
          </Link>
        )}

        <Link to="/properties" className="hover:text-gray-300">
          Property
        </Link>
        <Link to="/favourites" className="hover:text-gray-300">
          Favourites
        </Link>
        <Link to="/subscription" className="hover:text-gray-300">
          Subscription
        </Link>
        <Link to="/chat" className="hover:text-gray-300">
          Chat
        </Link>
      </div>

      {isOpen && !token && <LoginModal isOpen={isOpen} onClose={toggleMenu} />}
    </nav>
  );
};

export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaUser, FaHeart, FaEnvelope, FaHome } from 'react-icons/fa';
// import LoginModal from '../common/LoginModal';
// import { getCookie } from '../../helpers/getCookie';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const token = getCookie('token');
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleProfileOrLoginClick = () => {
//     if (token) {
//       navigate('/profile/details');
//     } else {
//       setIsOpen(true);
//     }
//   };

//   const NavLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => (
//     <Link
//       to={to}
//       className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
//         location.pathname === to ? 'bg-blue-800 text-white' : 'hover:bg-blue-700 hover:text-white'
//       }`}
//     >
//       {icon}
//       <span className="ml-2 font-medium">{children}</span>
//     </Link>
//   );

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white text-blue-900 shadow-md' : 'bg-transparent text-white'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-2xl font-bold text-blue-800 hover:text-blue-600">
//               Brand
//             </Link>
//           </div>

//           <div className="hidden md:flex md:items-center">
//             <div className="ml-10 flex space-x-6">
//               <NavLink to="/properties" icon={<FaHome className="text-lg" />}>Properties</NavLink>
//               <NavLink to="/favourites" icon={<FaHeart className="text-lg" />}>Favourites</NavLink>
//               <NavLink to="/subscription" icon={<FaEnvelope className="text-lg" />}>Subscription</NavLink>
//               <NavLink to="/chat" icon={<FaEnvelope className="text-lg" />}>Chat</NavLink>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <button
//               onClick={handleProfileOrLoginClick}
//               className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
//                 token ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-gray-100'
//               }`}
//             >
//               {token ? 'Profile' : 'Register'}
//             </button>
//             {token && (
//               <Link
//                 to="/addproperty"
//                 className="px-4 py-2 rounded-full font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
//               >
//                 Sell/Rent Property
//               </Link>
//             )}
//           </div>

//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu} className="text-2xl focus:outline-none">
//               {isOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-900 text-white`}>
//         <div className="px-4 pt-4 pb-6 space-y-4">
//           <NavLink to="/properties" icon={<FaHome className="text-xl" />}>Properties</NavLink>
//           <NavLink to="/favourites" icon={<FaHeart className="text-xl" />}>Favourites</NavLink>
//           <NavLink to="/subscription" icon={<FaEnvelope className="text-xl" />}>Subscription</NavLink>
//           <NavLink to="/chat" icon={<FaEnvelope className="text-xl" />}>Chat</NavLink>
//           <button
//             onClick={handleProfileOrLoginClick}
//             className="w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-800"
//           >
//             <FaUser className="text-xl" />
//             <span className="ml-2">{token ? 'Profile' : 'Register'}</span>
//           </button>
//           {token && (
//             <Link
//               to="/addproperty"
//               className="w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-green-600"
//             >
//               <FaHome className="text-xl" />
//               <span className="ml-2">Sell/Rent Property</span>
//             </Link>
//           )}
//         </div>
//       </div>

//       {isOpen && !token && <LoginModal isOpen={isOpen} onClose={toggleMenu} />}
//     </nav>
//   );
// };

// export default Navbar;
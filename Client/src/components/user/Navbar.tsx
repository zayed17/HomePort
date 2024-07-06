import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from '../common/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/store'
import { useGetUserMutation } from '../../store/user/userApi';
import { setUser } from '../../store/user/authSlice';



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state:RootState)=>state.auth.token)
  const dispatch = useDispatch()
  const [GetUser] = useGetUserMutation()

  const navigate = useNavigate()

  

  const toggleMenu = () => {
    if(token){
      navigate('/profile/details')
    }else{
      setIsOpen(!isOpen);
    }
  };

  return (
    <nav className="bg-LightdarkBlue text-white px-4 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/">Brand</Link>
      </div>
      <div className="text-lg font-semibold">
        <Link to="/owner-login">Sell</Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <button  onClick={toggleMenu} className="block mt-4 md:inline-block md:mt-0 md:ml-4 focus:outline-none">
          {token?"profile":"login"}
        </button>
      </div>
      {isOpen && <LoginModal isOpen={isOpen} onClose={toggleMenu} />}
    </nav>
  );
};

export default Navbar;

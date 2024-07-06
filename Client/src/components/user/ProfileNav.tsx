import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user/authSlice';
import { useGetUserMutation } from '../../store/user/userApi';
import { RootState } from '../../store/store';


const ProfileNav: React.FC = () => {
  const dispatch = useDispatch()
  const [GetUser] = useGetUserMutation()
  const token = useSelector((state:RootState)=>state.auth.token)

  useEffect(()=>{
    console.log("checking")
    const FetchUser = async()=>{
        try {
            if(token){
            const user = await GetUser(token).unwrap()
            console.log(user,"user")
            dispatch(setUser(user))
            }
        } catch (error) {
            console.log(error)
        }
    }
    FetchUser()
},[dispatch,token,GetUser])

  return (
    <div className="bg-white border-b border-gray-200 shadow-md text-gray-800 p-3 flex justify-between items-center">
      <div className="text-xl font-bold">Brand Name</div>
      <Link to="/" className="flex items-center bg-LightdarkBlue text-white py-2 px-4 rounded hover:bg-[#373759]">
        <FaArrowLeft className="mr-2" />
        Go Backs
      </Link>
    </div>
  );
};

export default ProfileNav;

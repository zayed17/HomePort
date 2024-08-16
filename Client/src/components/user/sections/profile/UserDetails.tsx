// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../../store/store';
// import EditUserModal from '../../EditModal';
// import axios from 'axios';
// import ChangePasswordModal from '../../ChangePasswordModal';
// import { setUser } from '../../../../store/user/userSlice';
// import { useGetUserMutation } from '../../../../store/user/userApi';
// import { getCookie } from '../../../../helpers/getCookie';

// const UserDetails: React.FC = () => {
//   const user = useSelector((state: RootState) => state.user.user);
// console.log(user,"cjekcs")
//   const token = getCookie('token');
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPreview, setIsPreview] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const [GetUser] = useGetUserMutation();
//   const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

//   const fetchUser = async () => {
//     try {
//       if (token) {
//         const fetchedUser = await GetUser(token).unwrap();
//         dispatch(setUser(fetchedUser.userDetails));
//       }
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [token, dispatch, GetUser]);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     fetchUser(); 
//   };

//   const handleChangePassModal = () => {
//     setIsChangePasswordModalOpen(prev => !prev);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setPhoto(file);
//     setIsPreview(true);
//   };

//   const handleCancel = () => {
//     setPhoto(null);
//     setIsPreview(false);
//   };

//   const handleUpload = async () => {
//     if (!photo) {
//       console.error('No file selected.');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('photo', photo);

//       const response = await axios.post('http://localhost:5001/user/uploadImage', formData, {withCredentials:true});
//       console.log('Image uploaded:', response);
//       fetchUser(); 
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!user) {
//     return <div>Loading user details...</div>;
//   }

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-md rounded my-10 px-8 pt-6 pb-4 mb-4 relative">
//       <div className="absolute top-0 right-0 mt-2 mr-2">
//         <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={handleEditClick} />
//       </div>
//       <div className="mb-4 text-center">
//         <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="photo">
//           Photo
//         </label>
//         <div className="relative w-32 h-32 mx-auto mb-2">
//           <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden relative">
//             {isLoading && (
//               <div className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//                 <div className="loader"></div>
//               </div>
//             )}
//             {(isPreview && photo) || user.image ? (
//               <img
//                 src={isPreview && photo ? URL.createObjectURL(photo) : user.image}
//                 alt="User Photo"
//                 className="object-cover w-full h-full rounded-full"
//               />
//             ) : (
//               <span className="text-gray-500 flex items-center justify-center h-full">
//                 No photo uploaded
//               </span>
//             )}
//           </div>
//           <input
//             type="file"
//             id="photo"
//             className="absolute inset-0 opacity-0 cursor-pointer"
//             onChange={handleFileChange}
//           />
//         </div>
//         {isPreview && (
//           <div className="mt-2 flex justify-center space-x-2">
//             <button
//               className="bg-red-500 text-white py-1 px-3 rounded-full text-sm"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-green-500 text-white py-1 px-3 rounded-full text-sm"
//               onClick={handleUpload}
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="firstName">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             disabled
//             className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
//             value={user.firstName}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="lastName">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             disabled
//             className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
//             value={user.lastName}
//             required
//           />
//         </div>
//       </div>
//       <div className="mb-4">
//         <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="email">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           disabled
//           className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           value={user.email}
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="phone">
//           Phone
//         </label>
//         <input
//           type="tel"
//           id="phone"
//           disabled
//           className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           value={user.phone}
//           required
//         />
//       </div>
//       <h4 className="cursor-pointer text-sm text-right" onClick={handleChangePassModal}>
//         Change Password
//       </h4>
//       <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={handleChangePassModal} email={user.email} />
//       <EditUserModal isOpen={isModalOpen} onClose={handleCloseModal} user={user} />
//     </div>
//   );
// };

// export default UserDetails;

import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import EditUserModal from '../../EditModal';
import axios from 'axios';
import ChangePasswordModal from '../../ChangePasswordModal';
import { setUser } from '../../../../store/user/userSlice';
import { useGetUserMutation } from '../../../../store/user/userApi';
import { getCookie } from '../../../../helpers/getCookie';

const UserDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = getCookie('token');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [GetUser] = useGetUserMutation();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const fetchUser = async () => {
    try {
      if (token) {
        const fetchedUser = await GetUser(token).unwrap();
        dispatch(setUser(fetchedUser.userDetails));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token, dispatch, GetUser]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchUser(); 
  };

  const handleChangePassModal = () => {
    setIsChangePasswordModalOpen(prev => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    setIsPreview(true);
  };

  const handleCancel = () => {
    setPhoto(null);
    setIsPreview(false);
  };

  const handleUpload = async () => {
    if (!photo) {
      console.error('No file selected.');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const response = await axios.post('http://localhost:5001/user/uploadImage', formData, {withCredentials:true});
      console.log('Image uploaded:', response);
      fetchUser(); 
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubscriptionBadgeStyle = (type) => {
    const baseStyle = "text-xs font-bold py-1 px-3 rounded-full uppercase shadow-lg transform transition-transform duration-300";
    switch (type?.toLowerCase()) {
      case 'basic':
        return `${baseStyle} bg-gradient-to-r from-green-400 to-green-600 text-white border-2 border-green-700 hover:scale-105`;
      case 'standard':
        return `${baseStyle} bg-gradient-to-r from-blue-400 to-blue-600 text-white border-2 border-blue-700 hover:scale-105`;
      case 'premium':
        return `${baseStyle} bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-2 border-yellow-700 hover:scale-105`;
      default:
        return `${baseStyle} bg-gradient-to-r from-gray-400 to-gray-600 text-white border-2 border-gray-700 hover:scale-105`;
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded my-10 px-8 pt-6 pb-4 mb-4 relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={handleEditClick} />
      </div>
      {user.subscriptionId?.type && <>
        <div className="absolute top-0 left-0 mt-4 ml-4">
        <span className={getSubscriptionBadgeStyle(user.subscriptionId?.type)}>
          {user.subscriptionId?.type}
        </span>
      </div>
      </>} 
      
      <div className="mb-4 text-center">
        <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="photo">
          Photo
        </label>
        <div className="relative w-32 h-32 mx-auto mb-2">
          <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                <div className="loader"></div>
              </div>
            )}
            {(isPreview && photo) || user.image ? (
              <img
                src={isPreview && photo ? URL.createObjectURL(photo) : user.image}
                alt="User Photo"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">
                No photo uploaded
              </span>
            )}
          </div>
          <input
            type="file"
            id="photo"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
        {isPreview && (
          <div className="mt-2 flex justify-center space-x-2">
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-full text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white py-1 px-3 rounded-full text-sm"
              onClick={handleUpload}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            disabled
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={user.firstName}
            required
          />
        </div>
        <div>
          <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            disabled
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={user.lastName}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          disabled
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.email}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          disabled
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.phone}
          required
        />
      </div>
      <h4 className="cursor-pointer text-sm text-right" onClick={handleChangePassModal}>
        Change Password
      </h4>
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={handleChangePassModal} email={user.email} />
      <EditUserModal isOpen={isModalOpen} onClose={handleCloseModal} user={user} />
    </div>
  );
};

export default UserDetails;
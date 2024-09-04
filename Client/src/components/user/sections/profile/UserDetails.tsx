import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditUserModal from '../../EditModal';
import axios from 'axios';
import ChangePasswordModal from '../../ChangePasswordModal';
import { useGetUserQuery } from '../../../../store/user/userApi';
import loaderGif from '/assets/gifff.gif';
import { differenceInDays } from 'date-fns';

const UserDetails: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const { data: { userDetails } = {}, isLoading, isError, error } = useGetUserQuery({});
  console.log(userDetails)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      const response = await axios.post('http:/localhost/api/user/uploadImage', formData, { withCredentials: true });
      console.log('Image uploaded:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    } 
  };



  const getSubscriptionBadgeStyle = (type: string) => {
    const baseStyle = "text-xs font-bold py-1 px-3 rounded-full uppercase shadow-lg transform transition-transform duration-300";
    switch (type?.toLowerCase()) {
      case 'basic':
        return `${baseStyle} bg-gradient-to-r from-green-400 to-green-600 text-white border-2 border-green-700 `;
      case 'standard':
        return `${baseStyle} bg-gradient-to-r from-blue-400 to-blue-600 text-white border-2 border-blue-700 `;
      case 'premium':
        return `${baseStyle} bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-2 border-yellow-700 `;
      default:
        return `${baseStyle} bg-gradient-to-r from-gray-400 to-gray-600 text-white border-2 border-gray-700 `;
    }
  };

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  const getRemainingDays = () => {
    if (userDetails.subscriptionId?.endDate) {
      const endDate = new Date(userDetails.subscriptionId.endDate);
      const today = new Date();
      const remainingDays = differenceInDays(endDate, today);

      if (remainingDays > 0) {
        return `${remainingDays} days left`;
      } else {
        return `Expired`;
      }
    }
    return null;
  };
  if (isError) {
    console.error('Error fetching user details:', error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">Failed to load user details. Please try again later.</p>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto  shadow-md rounded my-10 px-8 pt-6 pb-4 mb-4 relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={handleEditClick} />
      </div>
      {userDetails.subscriptionId?.type && (
        <div className="absolute top-0 left-0 mt-4 ml-4 flex flex-col items-start">
          <span className={getSubscriptionBadgeStyle(userDetails.subscriptionId?.type)}>
            {userDetails.subscriptionId?.type}
          </span>
          <span className="text-xs font-semibold mx-3">
            {getRemainingDays()}
          </span>
        </div>
      )}


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
            {(isPreview && photo) || userDetails.image ? (
              <img
                src={isPreview && photo ? URL.createObjectURL(photo) : userDetails.image}
                alt="user Photo"
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
            value={userDetails.firstName}
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
            value={userDetails.lastName}
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
          value={userDetails.email}
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
          value={userDetails.phone}
          required
        />
      </div>
      <h4 className="cursor-pointer text-sm text-right" onClick={handleChangePassModal}>
        Change Password
      </h4>
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={handleChangePassModal} email={userDetails.email} />
      <EditUserModal isOpen={isModalOpen} onClose={handleCloseModal} user={userDetails} />
    </div>
  );
};

export default UserDetails;
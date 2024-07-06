import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {RootState} from '../../../../store/store'
import EditUserModal from '../../EditModal';

const UserDetails: React.FC = () => {
  const user = useSelector((state:RootState)=>state.auth.user)
  const [photo, setPhoto] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded my-10 px-8 pt-6 pb-8 mb-4 relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={handleEditClick}/>
      </div>
      <div className="mb-4 text-center">
        <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="photo">
          Photo
        </label>
        <div className="relative w-32 h-32 mx-auto mb-2">
          <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt="User Photo"
                className="object-cover w-full h-full"
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const photoUrl = reader.result?.toString();
                  setPhoto(photoUrl || '');
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
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
            value={user?.userDetails?.firstName}
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
            value={user?.userDetails?.lastName}
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
          value={user?.userDetails?.email}
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
          value={user?.userDetails?.phone}
          required
        />
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={{
          firstName: user?.userDetails?.firstName || '',
          lastName: user?.userDetails?.lastName || '',
          email: user?.userDetails?.email || '',
          phone: user?.userDetails?.phone || ''
        }}
      />
    </div>
  );
};

export default UserDetails;

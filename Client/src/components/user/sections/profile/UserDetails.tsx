import React, { useState } from 'react';

const UserDetails: React.FC = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [photo, setPhoto] = useState('');

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4 text-center">
        <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="photo">
          Photo
        </label>
        <div className="relative w-24 h-24 mx-auto mb-2">
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
      <div className="mb-4 flex">
        <div className="w-1/2 mr-2">
          <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            disabled
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-DarkBlue text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            disabled
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-DarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default UserDetails;

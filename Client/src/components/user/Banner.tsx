import React from 'react';

const Banner: React.FC = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-64 md:h-96" 
      style={{ backgroundImage: `url(/assets/images/ohio.png)` }} 
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="max-w-md w-full px-4 py-2 mx-auto bg-white rounded-lg shadow-md md:px-8 md:py-4 md:max-w-xl">
        <div className="flex justify-center items-center">
            <h5>All</h5>
            <h5>Sell</h5>
            <h5>Rent</h5>
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React from 'react';

const CardSection: React.FC = () => {
  return (
    <>
     <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">What Our Clients Say</h2>
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
            <p className="text-xl text-gray-700 mb-6 italic">
              "LuxeRealty made our dream of owning a beachfront property a reality. Their expertise and dedication are unmatched!"
            </p>
            <div className="flex items-center justify-center">
              <img src="/client-avatar.jpg" alt="Client" className="w-16 h-16 rounded-full mr-4" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Emily Johnson</p>
                <p className="text-gray-600">Satisfied Homeowner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSection;


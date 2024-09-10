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

      <div className="bg-BlueGray text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8">Let our expert agents guide you through our exclusive listings.</p>
          <button className="bg-white text-BlueGray px-8 py-3 rounded-full text-lg font-semibold hover:bg-GrayishBlue hover:text-white transition duration-300">
            Contact Us Today
          </button>
        </div>
      </div>
    </>
  );
};

export default CardSection;


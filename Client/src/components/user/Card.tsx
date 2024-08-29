import React from 'react';
import Map from './MapShow'

const CardSection: React.FC = () => {
  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service1.jpg" alt="Service 1" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p className="text-gray-700">Description of service 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <Map />
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service2.jpg" alt="Service 2" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p className="text-gray-700">Description of service 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service3.jpg" alt="Service 3" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 3</h3>
              <p className="text-gray-700">Description of service 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;


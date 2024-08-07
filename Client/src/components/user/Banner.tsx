import React from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

const Banner: React.FC = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-fixed h-screen"
        style={{
          backgroundImage: `url(/assets/images/image.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full px-4 text-white">
          <h1 className="text-4xl  font-bold mb-4 text-center">
            Find Your Dream <span className='text-darkBlue'>Home</span>
          </h1>
          <p className="text-xl mb-8 text-center">
            We offer the best deals in town.
          </p>
          <div className="w-full max-w-md">
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                className="pl-10 pr-12 py-3 w-full bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search properties..."
              />
              <button className="absolute right-4 top-3 text-gray-400 hover:text-blue-500">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16">
  <div className="max-w-5xl mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Find Your Dream Home
        </h2>
        <blockquote className="text-xl font-semibold italic text-gray-600">
          "We offer the best deals in town."
        </blockquote>
      </div>
      <div className="md:w-1/2">
        <div className="relative">
          <img
            src="/assets/images/ohio.png"
            alt="Home"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-20 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Featured Property Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/assets/images/ohio.png"
                alt="Property 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Luxury Apartment</h3>
                <p className="text-gray-600 mb-4">3 Bedrooms, 2 Bathrooms</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-500 font-bold">$450,000</p>
                  <a href="#" className="text-blue-500 hover:text-blue-700 flex items-center">
                    View Details <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img
                src="/assets/images/image.jpg"
                alt="About"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
              <h2 className="text-3xl font-bold mb-4">About Our Real Estate Agency</h2>
              <p className="text-gray-600 mb-4">
                We are a leading real estate agency dedicated to helping our clients find their dream homes. With years of experience and a team of knowledgeable agents, we are committed to providing exceptional service and finding the perfect property for your needs.
              </p>
              <a href="#" className="text-blue-500 hover:text-blue-700 flex items-center">
                Learn More <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Banner;
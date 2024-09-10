import  { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaArrowRight, FaBed, FaBath, FaRuler, FaHeart } from 'react-icons/fa';

const LuxeRealEstatePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredProperties = [
    {
      id: 1,
      title: "Oceanfront Villa",
      beds: 5,
      baths: 4,
      sqft: 4500,
      price: 3500000,
      image: "/property-1.jpg",
      description: "Stunning oceanfront villa with panoramic views and private beach access."
    },
    {
      id: 2,
      title: "Mountain Retreat",
      beds: 4,
      baths: 3,
      sqft: 3800,
      price: 2800000,
      image: "/property-2.jpg",
      description: "Luxurious mountain home with breathtaking views and ski-in/ski-out access."
    },
    {
      id: 3,
      title: "Urban Penthouse",
      beds: 3,
      baths: 3,
      sqft: 3200,
      price: 4200000,
      image: "/property-3.jpg",
      description: "Exclusive penthouse in the heart of the city with a private rooftop terrace."
    },
  ];

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center bg-fixed h-screen" style={{ backgroundImage: `url(/assets/images/image.jpg)` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center h-full px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center animate-fade-in-down">
            Discover Your <span className="text-GrayishBlue">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl animate-fade-in-up">
            Unparalleled luxury and comfort await in our exclusive properties.
          </p>
          <div className="w-full max-w-md animate-fade-in">
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-400">
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                className="pl-12 pr-20 py-4 w-full bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-GrayishBlue focus:border-transparent transition duration-300 text-lg"
                placeholder="Search luxury properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-2 bg-GrayishBlue text-white px-4 py-2 rounded-full hover:bg-BlueGray transition duration-300 flex items-center">
                <FaSearch className="mr-2" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">Featured Luxury Properties</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Explore our handpicked selection of premium real estate</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-GrayishBlue text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                  <button className="absolute top-4 left-4 bg-white text-GrayishBlue p-2 rounded-full hover:bg-GrayishBlue hover:text-white transition duration-300">
                    <FaHeart />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{property.title}</h3>
                  <div className="flex items-center mb-4 text-gray-600">
                    <FaBed className="mr-2" /> <span className="mr-4">{property.beds} Beds</span>
                    <FaBath className="mr-2" /> <span className="mr-4">{property.baths} Baths</span>
                    <FaRuler className="mr-2" /> <span>{property.sqft} sqft</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {property.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-GrayishBlue font-bold text-2xl">${property.price.toLocaleString()}</p>
                    <button className="bg-GrayishBlue text-white px-6 py-2 rounded-full hover:bg-BlueGray transition duration-300 flex items-center">
                      View Details <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
     
    </div>
  );
};

export default LuxeRealEstatePage;
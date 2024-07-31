import React from 'react';

interface PropertyCardProps {
  image: string;
  location: string;
  rentAmount: number;
  size: string;
  pricePerSqft: string;
  bedrooms: number;
  bathrooms: number;
  furnished: string;
  description: string;
  lastUpdated: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  location,
  rentAmount,
  size,
  pricePerSqft,
  bedrooms,
  bathrooms,
  furnished,
  description,
  lastUpdated
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-64 relative">
        <img src={image} alt="Property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
      </div>
      <div className=" flex flex-col justify-between md:w-2/3">
        <div>
          <h3 className="text-xl font-bold mb-2">{location}</h3>
          <div className="flex space-x-2 mb-2">
            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">{`${bedrooms} Bedrooms`}</span>
            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">{`${bathrooms} Bathrooms`}</span>
            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">{furnished}</span>
          </div>
          <p className="text-gray-600 mb-2">{description}</p>
        </div>
        <div className="flex justify-between items-end bg-gray-500  p-4 ">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{rentAmount}</p>
            <p className="text-gray-600 text-sm">{pricePerSqft}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">{size}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">{lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
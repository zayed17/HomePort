import React from "react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  _id: string;
  image: string;
  location: string;
  rentAmount?: number;
  depositAmount?: number;
  sellPrice?: number;
  totalArea: string;
  bedrooms: number;
  bathrooms: number;
  balconies: string;
  description: string;
  lastUpdated: string;
  lookingFor: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  image,
  location,
  rentAmount,
  depositAmount,
  sellPrice,
  totalArea,
  bedrooms,
  bathrooms,
  balconies,
  lastUpdated,
  lookingFor,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/property/${_id}`);
  };
console.log(lastUpdated)
  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex flex-col md:flex-row cursor-pointer relative"
      aria-label={`View details of property at ${location}`}
    >
      <div className="w-full md:w-1/3 h-auto relative">
        <img src={image} alt={`Image of the property at ${location}`} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg"></div>
        <span className="absolute top-4 left-4  bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold">
          {lookingFor === "rent" ? "For Rent" : "For Sale"}
        </span>
      </div>
      <div className="flex flex-col justify-between md:w-2/3 p-6 bg-gradient-to-r from-white via-gray-100 to-white">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {location}
          </h3>
          <div className="flex space-x-3 mb-4">
            <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium">
              {`${bedrooms} Bedrooms`}
            </span>
            <span className="bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm font-medium">
              {`${bathrooms} Bathrooms`}
            </span>
            <span className="bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-medium">
              {`${balconies} Balconies`}
            </span>
          </div>
          <p className="text-md font-bold text-gray-400">{totalArea} / SqFt</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-left">
            {rentAmount !== 0 && (
              <>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{rentAmount?.toLocaleString("en-IN")}
                  <span className="text-sm text-gray-500"> /Month</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Deposit: ₹{depositAmount?.toLocaleString("en-IN")}
                </p>
              </>
            )}
            {sellPrice !== 0 && (
              <p className="text-3xl font-bold text-gray-800">
                ₹{sellPrice?.toLocaleString("en-IN")}
              </p>
            )}
          </div>
          {/* <div className="text-left">
            <p className="text-gray-500 text-sm">{lastUpdated}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

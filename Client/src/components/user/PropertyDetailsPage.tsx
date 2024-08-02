import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/propertyApi';
import {
  FaBed, FaBath, FaCar, FaMotorcycle, FaBicycle, FaRupeeSign, FaMapMarkerAlt, FaDollarSign
} from 'react-icons/fa';
import { GiBo } from 'react-icons/gi';
import { AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, error, isLoading } = useGetPropertyQuery(id || '');

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    property && (
      <div className="container mx-auto p-6 min-h-screen">
        {/* Property Media */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto space-x-4 py-4">
            {property.mediaFiles.map((url: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <img
                  src={url}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.propertyType}</h1>
            <p className="text-xl text-gray-600">{property.address}</p>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Contact Agent
            </button>
          </div>
        </div>

        {/* Property Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
            <ul className="list-disc list-inside">
              <li className="text-lg mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Address: {property.address}
              </li>
              <li className="text-lg mb-2 flex items-center">
                <FaBed className="mr-2 text-gray-600" />
                Bedrooms: {property.bedrooms}
              </li>
              <li className="text-lg mb-2 flex items-center">
                <FaBath className="mr-2 text-gray-600" />
                Bathrooms: {property.bathrooms}
              </li>
              <li className="text-lg mb-2 flex items-center">
                <GiBo className="mr-2 text-gray-600" />
                Balconies: {property.balconies}
              </li>
              <li className="text-lg mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Total Area: {property.totalArea} sq. ft.
              </li>
              <li className="text-lg mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Facing: {property.facing}
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Property Features</h3>
            <ul className="list-disc list-inside">
              <li className="text-lg mb-2 flex items-center">
                {property.hasWell === 'Yes' ? (
                  <AiOutlineCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="mr-2 text-red-500" />
                )}
                Has Well: {property.hasWell}
              </li>
              <li className="text-lg mb-2 flex items-center">
                {property.furnisherType ? (
                  <AiOutlineCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="mr-2 text-red-500" />
                )}
                Furnisher Type: {property.furnisherType || 'N/A'}
              </li>
              <li className="text-lg mb-2 flex items-center">
                {property.isNegotiable === 'Yes' ? (
                  <AiOutlineCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="mr-2 text-red-500" />
                )}
                Rent Negotiable: {property.isNegotiable}
              </li>
              <li className="text-lg mb-2 flex items-center">
                {property.areBillsIncluded === 'Yes' ? (
                  <AiOutlineCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <AiOutlineCloseCircle className="mr-2 text-red-500" />
                )}
                Bills Included: {property.areBillsIncluded}
              </li>
            </ul>
          </div>
        </div>

        {/* Property Price & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rent</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <FaDollarSign className="mr-2" />
              ${property.rentAmount}
            </p>
            <p className="text-lg mb-2 flex items-center">
              <FaRupeeSign className="mr-2 text-gray-600" />
              Deposit Amount: {property.depositAmount}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Availability</h3>
            <p className="text-lg mb-2 flex items-center">
              <AiOutlineCalendar className="mr-2 text-gray-600" />
              Property Age: {property.propertyAge}
            </p>
            <p className="text-lg mb-2 flex items-center">
              <AiOutlineCalendar className="mr-2 text-gray-600" />
              Available From: {property.availableFrom}
            </p>
          </div>
        </div>

        {/* Property Advantages */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Advantages</h3>
          <ul className="list-disc list-inside">
            {property.propertyAdvantages.map((advantage: string, index: number) => (
              <li key={index} className="text-lg mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                {advantage}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Details */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Details</h3>
          <ul className="list-disc list-inside">
            <li className="text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              Total Floors: {property.totalFloors}
            </li>
            <li className="text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              Openings: {property.openings}
            </li>
            <li className="text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              Other Rooms: {Array.isArray(property.otherRooms) ? property.otherRooms.join(', ') : 'N/A'}
            </li>
                        <li className="text-lg mb-2 flex items-center">
              <FaCar className="mr-2 text-gray-600" />
              No. of Cars: {property.noOfCars}
            </li>
            <li className="text-lg mb-2 flex items-center">
              <FaMotorcycle className="mr-2 text-gray-600" />
              No. of Scooters: {property.noOfScooters}
            </li>
            <li className="text-lg mb-2 flex items-center">
              <FaBicycle className="mr-2 text-gray-600" />
              No. of Bikes: {property.noOfBikes}
            </li>
            <li className="text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              Nearby Places: {Array.isArray(property.nearbyPlaces) ? property.nearbyPlaces.join(', ') : 'N/A'}
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default PropertyDetailsPage;
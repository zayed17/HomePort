import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useGetPendingPropertiesQuery } from '../../store/propertyApi';
import PropertyDetailsModal from './PropertyDetailsModal';

const Notification: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const { data: properties = [], isLoading, isError } = useGetPendingPropertiesQuery();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="relative">
      <button onClick={handleDropdownToggle} className="relative focus:outline-none">
        <FaBell className="text-gray-800 text-2xl hover:text-blue-600 transition-colors duration-300" /> {/* Notification icon */}
        {properties.length > 0 && (
          <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
            {properties.length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="text-center py-2 bg-LightdarkBlue text-white font-semibold text-lg rounded-t-lg">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {isLoading && <p className="p-4">Loading...</p>}
            {isError && <p className="p-4 text-red-500">Error loading notifications</p>}
            {!isLoading && !isError && properties.map((property : any) => (
              <li
                key={property._id}
                className="p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{property.address}</h4>
                  </div>
                  <span className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                    Details
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedProperty && (
        <PropertyDetailsModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Notification;
import React, { useState } from 'react';
import PropertyDetailsForm from '../../components/user/PropertyDetails';
import LocationDetailsForm from '../../components/user/PropertyLocation';
import VideosPhotosForm from '../../components/user/PropertyVideos';
import RentDetailsForm from '../../components/user/PropertyRent';
import AdditionalDetailsForm from '../../components/user/PropertyAdditional';
import Button from '../../components/common/Button';
import { FaHome, FaMapMarkerAlt, FaVideo, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

const PropertyAddPage = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '',
    address: '',
    city: '',
    mediaFiles: [],
    monthlyRent: '',
    depositAmount: '',
    additionalInfo: '',
    amenities: '',
  });

  const sectionTitles = [
    { title: 'Property Details', icon: <FaHome title="Property Details" /> },
    { title: 'Location Details', icon: <FaMapMarkerAlt title="Location Details" /> },
    { title: 'Videos & Photos', icon: <FaVideo title="Videos & Photos" /> },
    { title: 'Rent Details', icon: <FaDollarSign title="Rent Details" /> },
    { title: 'Additional Details', icon: <FaInfoCircle title="Additional Details" /> },
  ];

  const handleFormSubmit = () => {
    console.log('Form Data:', formData);
    setFormData({
      propertyName: '',
      propertyType: '',
      address: '',
      city: '',
      mediaFiles: [],
      monthlyRent: '',
      depositAmount: '',
      additionalInfo: '',
      amenities: '',
    });
  };

  const handleSectionClick = (sectionIndex) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <div className="flex">
      <div className="w-1/4 m-8 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Sections</h2>
        <ul className="space-y-4">
          {sectionTitles.map((section, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded text-center ${
                currentSection === index + 1 ? 'bg-blue-500' : 'hover:bg-gray-600'
              }`}
              onClick={() => handleSectionClick(index + 1)}
              title={section.title}
            >
              <div className="flex items-center justify-center mb-1">{section.icon}</div>
              <span className="text-xs">{section.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-4 flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-6">Add Property</h1>

        {currentSection === 1 && (
          <PropertyDetailsForm formData={formData} setFormData={setFormData} />
        )}
        {currentSection === 2 && (
          <LocationDetailsForm formData={formData} setFormData={setFormData} />
        )}
        {currentSection === 3 && (
          <VideosPhotosForm formData={formData} setFormData={setFormData} />
        )}
        {currentSection === 4 && (
          <RentDetailsForm formData={formData} setFormData={setFormData} />
        )}
        {currentSection === 5 && (
          <AdditionalDetailsForm formData={formData} setFormData={setFormData} />
        )}

        <div className="mt-8 flex justify-between">
          {currentSection > 1 && (
            <Button onClick={() => handleSectionClick(currentSection - 1)}>Back</Button>
          )}
          {currentSection < sectionTitles.length && (
            <Button onClick={() => handleSectionClick(currentSection + 1)}>Next</Button>
          )}
          {currentSection === sectionTitles.length && (
            <Button onClick={handleFormSubmit}>Submit Property</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyAddPage;
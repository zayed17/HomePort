import { FormEvent, useState } from 'react';
import PropertyDetailsForm from '../../components/user/PropertyDetails';
import LocationDetailsForm from '../../components/user/PropertyLocation';
import VideosPhotosForm from '../../components/user/PropertyVideos';
import RentDetailsForm from '../../components/user/PropertyRent';
import AdditionalDetailsForm from '../../components/user/PropertyAdditional';
import { FaHome, FaMapMarkerAlt, FaVideo, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { useAddPropertyMutation } from '../../store/propertyApi';
const PropertyAddPage = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [addProperty] = useAddPropertyMutation()
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    mediaFiles: [],
    depositAmount: 0,
    facing: '',
    propertyAge: '',
    totalFloors: 0,
    openings: 0,
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    totalArea: 0,
    hasWell: false,
    furnisherType: '',
    electronics: {},
    rentAmount: 0,
    isRentNegotiable: '',
    areBillsIncluded: '',
    eligibility: '',
    availableFrom: '',
    otherRooms: [], 
    propertyFeatures: [],
    propertyAdvantages: [],
    noOfCars: 0,
    noOfScooters: 0,
    noOfBikes: 0,
    directionTips: ''
  });

  const sectionTitles = [
    { title: 'Property Details', icon: <FaHome title="Property Details" /> },
    { title: 'Location Details', icon: <FaMapMarkerAlt title="Location Details" /> },
    { title: 'Videos & Photos', icon: <FaVideo title="Videos & Photos" /> },
    { title: 'Rent Details', icon: <FaDollarSign title="Rent Details" /> },
    { title: 'Additional Details', icon: <FaInfoCircle title="Additional Details" /> },
  ];

  // const handleFormSubmit = async() => {
  //   await addProperty(formData).unwrap();
  //   setFormData({
  //       propertyType: '',
  //     address: '',
  //     city: '',
  //     mediaFiles: [],
  //     depositAmount: 0,
  //         facing: '',
  //     propertyAge: '',
  //     totalFloors: 0,
  //     openings: 0,
  //     description: '',
  //     bedrooms: 0,
  //     bathrooms: 0,
  //     balconies: 0,
  //     totalArea: 0,
  //     hasWell: false,
  //     furnisherType: '',
  //     electronics: {},
  //     rentAmount: 0,
  //     isRentNegotiable: '',
  //     areBillsIncluded: '',
  //     eligibility: '',
  //     availableFrom: '',
  //     otherRooms: [], 
  //     propertyFeatures: [],
  //     propertyAdvantages: [],
  //     noOfCars: 0,
  //     noOfScooters: 0,
  //     noOfBikes: 0,
  //     directionTips: ''
  //   });
  // };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (key === 'mediaFiles' && Array.isArray(value)) {
        value.forEach((file) => {
          formDataToSend.append('mediaFiles', file); // Ensure this matches the Multer config
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((subKey) => {
          formDataToSend.append(`${key}[${subKey}]`, value[subKey as keyof typeof value]);
        });
      } else {
        formDataToSend.append(key, value as Blob);
      }
    });
  
    try {
      await addProperty(formDataToSend).unwrap();
      // Reset the form if needed
      setFormData({
        propertyType: '',
        address: '',
        city: '',
        mediaFiles: [],
        depositAmount: 0,
        facing: '',
        propertyAge: '',
        totalFloors: 0,
        openings: 0,
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        balconies: 0,
        totalArea: 0,
        hasWell: false,
        furnisherType: '',
        electronics: {},
        rentAmount: 0,
        isRentNegotiable: '',
        areBillsIncluded: '',
        eligibility: '',
        availableFrom: '',
        otherRooms: [],
        propertyFeatures: [],
        propertyAdvantages: [],
        noOfCars: 0,
        noOfScooters: 0,
        noOfBikes: 0,
        directionTips: ''
      });
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };

  const handleSectionClick = (sectionIndex : number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full text-white p-4 shadow-lg flex justify-center">
        <div className="flex items-center space-x-4">
          {sectionTitles.map((section, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentSection === index + 1 ? 'bg-LightdarkBlue' : 'bg-gray-300'}`}
                onClick={() => handleSectionClick(index + 1)}
                title={section.title} >
                {section.icon}
              </div>
              <span
                className={`mt-2 text-xs ${currentSection === index + 1 ? 'text-LightdarkBlue' : 'text-gray-600'}`}
              >
                {section.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
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

        <div className="mt-8 flex justify-end space-x-4">
          {currentSection > 1 && (
            <button
              onClick={() => handleSectionClick(currentSection - 1)}
              className="px-4 py-2 bg-LightdarkBlue text-white rounded shadow"
            >
              Back
            </button>
          )}
          {currentSection < sectionTitles.length && (
            <button
              onClick={() => handleSectionClick(currentSection + 1)}
              className="px-4 py-2 bg-LightdarkBlue text-white rounded shadow"
            >
              Next
            </button>
          )}
          {currentSection === sectionTitles.length && (
            <button
              onClick={handleFormSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyAddPage;


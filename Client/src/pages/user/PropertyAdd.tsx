import { FormEvent, useEffect, useState } from 'react';
import PropertyDetailsForm from '../../components/user/PropertyDetails';
import LocationDetailsForm from '../../components/user/PropertyLocation';
import VideosPhotosForm from '../../components/user/PropertyVideos';
import RentDetailsForm from '../../components/user/PropertyRent';
import SellDetailsForm from '../../components/user/PropertySell';
import AdditionalDetailsForm from '../../components/user/PropertyAdditional';
import { FaHome, FaMapMarkerAlt, FaVideo, FaDollarSign, FaTag, FaInfoCircle } from 'react-icons/fa';
import { useAddPropertyMutation, useUpdatePropertyMutation, useGetPropertyQuery } from '../../store/property/propertyApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import loaderGif from '/assets/gifff.gif';
import validationRules from '../../helpers/propertyValidation';

const PropertyAddPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const isEditing = !!propertyId;
  const [lookingFor, setLookingFor] = useState<string | null>(null); 
  const [currentSection, setCurrentSection] = useState(1);
  const [addProperty, { isLoading: isAddingProperty }] = useAddPropertyMutation();
  const [updateProperty, { isLoading: isUpdatingProperty }] = useUpdatePropertyMutation();
  const navigate = useNavigate();

  const { data: property, error, isLoading } = useGetPropertyQuery(propertyId || '', {
    skip: !isEditing, 
  });

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
    isNegotiable: '',
    areBillsIncluded: '',
    eligibility: '',
    availableFrom: '',
    otherRooms: [],
    propertyFeatures: [],
    propertyAdvantages: [],
    noOfCars: 0,
    noOfScooters: 0,
    noOfBikes: 0,
    directionTips: '',
    sellPrice: 0,
    propertyCondition: '',
    lookingFor: '',
    longitude: 0,
    latitude: 0 
  });

  useEffect(() => {
    if (isEditing && property) {
      setFormData(property);
      setLookingFor(property.lookingFor);
    }
  }, [isEditing, property]);

  const sectionTitles = [
    { title: 'Property Details', icon: <FaHome title="Property Details" /> },
    { title: 'Location Details', icon: <FaMapMarkerAlt title="Location Details" /> },
    { title: 'Videos & Photos', icon: <FaVideo title="Videos & Photos" /> },
    { title: lookingFor === 'rent' ? 'Rent Details' : 'Sell Details', icon: lookingFor === 'rent' ? <FaDollarSign title="Rent Details" /> : <FaTag title="Sell Details" /> },
    { title: 'Additional Details', icon: <FaInfoCircle title="Additional Details" /> },
  ];

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    let allFieldsValid = true;

    // Validate each field
    Object.keys(validationRules).forEach((field) => {
        const { required, type, min, message } = validationRules[field];
        let isRequired = required;

        if (field === 'depositAmount') {
            isRequired = (formData.lookingFor === "rent");
        }

        if (field === 'rentAmount') {
            isRequired = (formData.lookingFor === "rent");
        }

        if (field === 'sellPrice') {
            isRequired = (formData.lookingFor === "sell");
        }

        const value = formData[field];

        if (isRequired && (value === "" || (type === 'number' && value < min))) {
            toast.error(message);
            allFieldsValid = false;
        }

        if (field === 'mediaFiles' && value.length < 3) {
            toast.error("You must upload at least 3 media files.");
            allFieldsValid = false;
        }
    });

    if (!allFieldsValid) {
        return;
    }
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (key === 'mediaFiles' && Array.isArray(value)) {
        value.forEach((file) => {
          formDataToSend.append('mediaFiles', file);
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
console.log(formDataToSend,"condoel")
    try {
      if (isEditing) {
        await updateProperty(formDataToSend).unwrap();
        toast.success('Property updated successfully');
        navigate('/profile/properties');
      } else {
        await addProperty(formDataToSend).unwrap();
        toast.success('Property added successfully');
        navigate('/');
      }

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
        isNegotiable: '',
        areBillsIncluded: '',
        eligibility: '',
        availableFrom: '',
        otherRooms: [],
        propertyFeatures: [],
        propertyAdvantages: [],
        noOfCars: 0,
        noOfScooters: 0,
        noOfBikes: 0,
        directionTips: '',
        sellPrice: 0,
        propertyCondition: '',
        lookingFor: '',
        longitude: 0,
        latitude: 0 
      });

      setLookingFor(null); 
      setCurrentSection(1);
    } catch (error:any) {
      console.error('Error submitting property:', error);
      toast.error(error.data.message);
    }
  };


  const handleSectionClick = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  const handleLookingForSelection = (selection: string) => {
    setLookingFor(selection);
    setFormData(prevFormData => ({ ...prevFormData, lookingFor: selection }));
  };

  if (isLoading || isAddingProperty || isUpdatingProperty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  if (error) return <p>Error loading property data</p>;

  if (!lookingFor && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">What are you looking for?</h2>
        <div className="space-x-4">
          <button onClick={() => handleLookingForSelection('rent')} className="px-4 py-2 bg-BlueGray text-white rounded">Rent</button>
          <button onClick={() => handleLookingForSelection('sell')} className="px-4 py-2 bg-GrayishBlue text-white rounded">Sell</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full text-white p-4 shadow-lg flex justify-center">
        <div className="flex items-center space-x-4">
          {sectionTitles.map((section, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentSection === index + 1 ? 'bg-BlueGray' : 'bg-gray-300'}`}
                onClick={() => handleSectionClick(index + 1)}
                title={section.title}
              >
                {section.icon}
              </div>
              <span className={`mt-2 text-xs ${currentSection === index + 1 ? 'text-BlueGray' : 'text-gray-600'}`}>
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
          lookingFor === 'rent' ? <RentDetailsForm formData={formData} setFormData={setFormData} /> : <SellDetailsForm formData={formData} setFormData={setFormData} />
        )}
        {currentSection === 5 && (
          <AdditionalDetailsForm formData={formData} setFormData={setFormData} />
        )}

        <div className="mt-8 flex justify-end space-x-4">
          {currentSection > 1 && (
            <button onClick={() => handleSectionClick(currentSection - 1)} className="px-4 py-2 bg-BlueGray text-white rounded shadow">
              Back
            </button>
          )}
          {currentSection < sectionTitles.length && (
            <button onClick={() => handleSectionClick(currentSection + 1)} className="px-4 py-2 bg-BlueGray text-white rounded shadow">
              Next
            </button>
          )}
          {currentSection === sectionTitles.length && (
            <button onClick={handleFormSubmit} className="px-4 py-2 bg-GrayishBlue text-white rounded shadow" >
              {isEditing ? 'Update Property' : 'Add Property'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyAddPage;
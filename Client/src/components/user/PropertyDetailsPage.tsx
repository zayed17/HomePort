import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/propertyApi';
import { FaRegFlag, FaHeart, FaFan, FaRegWindowMaximize, FaLightbulb, FaBuilding, FaMapMarkerAlt, FaCompass, FaTv, FaRuler, FaCalendarAlt, FaCouch, FaWater, FaBed, FaShower, FaWindowMaximize, FaChair, FaCar, FaMotorcycle } from 'react-icons/fa';
import { MdBalcony, MdOutlineMicrowave } from "react-icons/md";
import { BiFridge, BiCabinet } from "react-icons/bi";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { PiFanThin } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { GiWashingMachine, GiVacuumCleaner, GiTable, GiScooter } from 'react-icons/gi';
import ReportModal from './ReportModal';

const electronicsIcons = {
  "AC": <TbAirConditioningDisabled />,
  "BathTub": <FaShower />,
  "Bed": <FaBed />,
  "Chair": <FaChair />,
  "Chimney": <FaRegWindowMaximize />,
  "Exhaust Fan": <PiFanThin />,
  "Fans": <FaFan />,
  "Fridge": <BiFridge />,
  "Lights": <FaLightbulb />,
  "Microwave": <MdOutlineMicrowave />,
  "Sofa": <LuSofa />,
  "Stove": <LuSofa />,
  "TV": <FaTv />,
  "Table": <GiTable />,
  "Vacuum Cleaner": <GiVacuumCleaner />,
  "Wardrobe": <BiCabinet />,
  "Washing Machine": <GiWashingMachine />
};

const PropertyDetailsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const basicInfoRef = useRef<HTMLDivElement | null>(null);
  const propertySpecsRef = useRef<HTMLDivElement | null>(null);
  const furinsherRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    'Basic Information': basicInfoRef,
    'Property Specifications': propertySpecsRef,
    'Furinsher': furinsherRef,
    'Parking Space and Property Features': featuresRef,
  };

  const [activeSection, setActiveSection] = useState<string>('Basic Information');

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150;

    for (const section in sectionRefs) {
      const ref = sectionRefs[section].current;
      if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
        setActiveSection(section);
        break;
      }
    }
  };

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section].current;
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
        <p>Error: </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-4 text-gray-600">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.propertyType}</h1>
          <p className="text-xl text-gray-600">{property.address}</p>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={openModal}
            className="border-LightdarkBlue border text-LightdarkBlue font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2"
          >
            <FaRegFlag className="text-LightdarkBlue" />
            <span>Report</span>
          </button>
          <FaHeart
            onClick={() => console.log("Favorite")}
            className="text-LightdarkBlue cursor-pointer text-xl"
          />
        </div>
      </div>

      <ReportModal isOpen={isModalOpen} propertyId={property._id} onClose={closeModal} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {property.mediaFiles.slice(0, 1).map((url: string, index: number) => (
          <div key={index} className="col-span-2 row-span-2">
            <img
              src={url}
              alt={`Property Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300"
            />
          </div>
        ))}
        {property.mediaFiles.slice(1).map((url: string, index: number) => (
          <div key={index} className="col-span-1">
            <img
              src={url}
              alt={`Property Image ${index + 2}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-4">

        <div className="w-[70%] rounded-2xl">
          <div className='mb-3 flex bg-gray-200 p-3 font-bold justify-evenly sticky top-0 rounded-lg shadow-md'>
            {Object.keys(sectionRefs).map((section) => (
              <div
                key={section}
                className={`${activeSection === section ? 'border-b-4 border-gray-400 text-gray-500' : 'text-DarkBlue'
                  } cursor-pointer transition-colors duration-300  py-2 px-4 rounded-md`}
                onClick={() => scrollToSection(section)}
              >
                {section}
              </div>
            ))}
          </div>
          <div ref={basicInfoRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold text-black border-b-2 pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 mt-3 gap-3">
              <div className="flex items-center text-gray-600">
                <FaBuilding className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Property Type: </strong> {property.propertyType}
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Address: </strong> {property.address}
              </div>
              <div className="flex items-center text-gray-600">
                <FaCompass className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Direction Tips: </strong> {property.directionTips}
              </div>
            </div>
          </div>

          <div ref={propertySpecsRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold text-black border-b-2 pb-2">Property Specifications</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <FaBed className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Bedrooms:</strong> {property.bedrooms}
              </div>
              <div className="flex items-center text-gray-600">
                <FaShower className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Bathrooms:</strong> {property.bathrooms}
              </div>
              <div className="flex items-center text-gray-600">
                <MdBalcony className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Balconies:</strong> {property.balconies}
              </div>
              <div className="flex items-center text-gray-600">
                <FaRuler className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Total Area:</strong> {property.totalArea} sqft
              </div>
              <div className="flex items-center text-gray-600">
                <FaBuilding className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Total Floors:</strong> {property.totalFloors}
              </div>
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Property Age:</strong> {property.propertyAge}
              </div>
              <div className="flex items-center text-gray-600">
                <FaCouch className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Furnisher Type:</strong> {property.furnisherType}
              </div>
              <div className="flex items-center text-gray-600">
                <FaCompass className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Facing:</strong> {property.facing}
              </div>
              <div className="flex items-center text-gray-600">
                <FaWindowMaximize className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Openings:</strong> {property.openings}
              </div>
              <div className="flex items-center text-gray-600">
                <FaWater className="mr-2 text-gray-800" />
                <strong className="text-gray-800 px-1">Has Well:</strong> {property.hasWell ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
          <div ref={furinsherRef} className="p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold text-black border-b-2 pb-2">
              Furinsher
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {Object.entries(property.electronics || {}).map(([item, count]) => (
                <div key={item} className="flex items-center text-gray-600">
                  {electronicsIcons[item] || <FaTv />}
                  <strong className="text-gray-800 px-1">{item}:</strong> {count}
                </div>
              ))}
            </div>
          </div>
          <div ref={featuresRef} className="p-6 my-8 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold text-black border-b-2 pb-2">Parking Space and Property Features</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <FaCar className="mr-2 text-gray-800" />
                <strong className="text-gray-800">Cars:</strong> {property.noOfCars}
              </div>
              <div className="flex items-center text-gray-600">
                <FaMotorcycle className="mr-2 text-gray-800" />
                <strong className="text-gray-800">Bikes:</strong> {property.noOfBikes}
              </div>
              <div className="flex items-center text-gray-600">
                <GiScooter className="mr-2 text-gray-800" />
                <strong className="text-gray-800">Scooters:</strong> {property.noOfScooters}
              </div>
            </div>
            {property.propertyFeatures?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Property Features:</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  {property.propertyFeatures.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {property.propertyAdvantages?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Property Advantages:</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  {property.propertyAdvantages.map((advantage: string, index: number) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-[30%] p-6 rounded-2xl bg-white shadow-lg sticky top-0 h-fit border border-gray-200">
          <div className="mb-6 flex flex-col items-center space-y-4">
            {property.lookingFor === 'rent' ? (
              <>
                <div className="text-center flex flex-col items-center space-y-4">
                  <div className="flex flex-row items-center justify-center space-x-8">
                    <div className="flex flex-col items-center">
                      <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
                        ₹{property.rentAmount}
                      </h2>
                      <span className="text-sm text-gray-500">
                        Rent/month
                      </span>
                    </div>
                    <div className=" text-3xl items-center">
                      |
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-4xl font-extrabold text-gray-800 mb-1">
                        ₹{property.depositAmount}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Deposit
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
                  ₹{property.sellPrice}
                </h2>
                <span className='text-sm text-gray-500'>
                  Sell Price
                </span>
              </div>
            )}
            <button className='rounded-full p-3 bg-LightdarkBlue text-white w-full font-semibold hover:bg-darkBlue transition-all'>
              Book now
            </button>
          </div>
          <hr className='my-6 border-gray-300' />
          <div className="text-center">
            <h3 className='font-bold text-2xl text-gray-700 mb-4'>Property Owner</h3>
            <p className='text-gray-600 mb-2'><strong>Name:</strong> {property.createdBy.name}</p>
            <p className='text-gray-600 mb-2'><strong>Email:</strong> {property.createdBy.email}</p>
            <p className='text-gray-600'><strong>Phone:</strong> {property.createdBy.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
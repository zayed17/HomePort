// import React, { useEffect, useRef, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useGetPropertyQuery } from '../../store/property/propertyApi';
// import { FaRegFlag, FaFan, FaRegWindowMaximize, FaLightbulb, FaBuilding, FaMapMarkerAlt, FaCompass, FaTv, FaRuler, FaCalendarAlt, FaCouch, FaWater, FaBed, FaShower, FaWindowMaximize, FaChair, FaCar, FaMotorcycle } from 'react-icons/fa';
// import { MdBalcony, MdOutlineMicrowave } from "react-icons/md";
// import { BiFridge, BiCabinet } from "react-icons/bi";
// import { TbAirConditioningDisabled } from "react-icons/tb";
// import { PiFanThin } from "react-icons/pi";
// import { LuSofa } from "react-icons/lu";
// import { GiWashingMachine, GiVacuumCleaner, GiTable, GiScooter } from 'react-icons/gi';
// import ReportModal from './ReportModal';
// import loaderGif from '/assets/gifff.gif';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import 'react-photo-view/dist/react-photo-view.css';
// import ConnectWithOwnerButton from '../user/connectButton';
// import ChatInterface from '../user/chat';

// const electronicsIcons = {
//   "AC": <TbAirConditioningDisabled />,
//   "BathTub": <FaShower />,
//   "Bed": <FaBed />,
//   "Chair": <FaChair />,
//   "Chimney": <FaRegWindowMaximize />,
//   "Exhaust Fan": <PiFanThin />,
//   "Fans": <FaFan />,
//   "Fridge": <BiFridge />,
//   "Lights": <FaLightbulb />,
//   "Microwave": <MdOutlineMicrowave />,
//   "Sofa": <LuSofa />,
//   "Stove": <LuSofa />,
//   "TV": <FaTv />,
//   "Table": <GiTable />,
//   "Vacuum Cleaner": <GiVacuumCleaner />,
//   "Wardrobe": <BiCabinet />,
//   "Washing Machine": <GiWashingMachine />
// };

// const PropertyDetailsPage: React.FC = () => {


//   const [chatId, setChatId] = useState<string | null>(null);

//   const handleChatStart = (id: string) => {
//     setChatId(id);
//     console.log("Chat ID received:", id); // Debugging log

//   };


//   const navigate = useNavigate();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const basicInfoRef = useRef<HTMLDivElement | null>(null);
//   const propertySpecsRef = useRef<HTMLDivElement | null>(null);
//   const furinsherRef = useRef<HTMLDivElement | null>(null);
//   const featuresRef = useRef<HTMLDivElement | null>(null);

//   const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
//     'Basic Information': basicInfoRef,
//     'Property Specifications': propertySpecsRef,
//     'Furinsher': furinsherRef,
//     'Parking Space and Property Features': featuresRef,
//   };

//   const [activeSection, setActiveSection] = useState<string>('Basic Information');

//   const handleScroll = () => {
//     const scrollPosition = window.scrollY + 150;

//     for (const section in sectionRefs) {
//       const ref = sectionRefs[section].current;
//       if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
//         setActiveSection(section);
//         break;
//       }
//     }
//   };

//   const scrollToSection = (section: string) => {
//     const ref = sectionRefs[section].current;
//     if (ref) {
//       window.scrollTo({
//         top: ref.offsetTop - 70,
//         behavior: 'smooth',
//       });
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const { id } = useParams<{ id: string }>();

//   const { data: property, error, isLoading } = useGetPropertyQuery(id || '');
//   const mainImage = property?.mediaFiles[0];
//   const otherImages = property?.mediaFiles.slice(1, 4);
//   const hasMoreImages = property?.mediaFiles.length > 4;
//   const handleBooking = () => {
//     navigate(`/booking/${property._id}`);
//   };


//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-4 text-red-600">
//         <p>Error: </p>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="container mx-auto p-4 text-gray-600">
//         <p>Property not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 min-h-screen ">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.propertyType}</h1>
//           <p className="text-xl text-gray-600">{property.address}</p>
//         </div>
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={openModal}
//             className="border-BlueGray border text-BlueGray font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2"
//           >
//             <FaRegFlag className="text-BlueGray" />
//             <span>Report</span>
//           </button>
//         <ConnectWithOwnerButton
//         ownerId={property?.createdBy?._id}
//         ownerName={property?.createdBy?.name}
//         ownerPhoto={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fblack-contact-person-icon-on-white-background-vector-31046197&psig=AOvVaw3bz8wHQkL7E2YTdO3Mo4U3&ust=1724239471574000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDOnNu6g4gDFQAAAAAdAAAAABAE'}
//         onChatStart={handleChatStart} />
//           {chatId && <ChatInterface />}
//         </div>
//       </div>

//       <ReportModal isOpen={isModalOpen} propertyId={property._id} onClose={closeModal} />
//       <PhotoProvider>
//         <div className="flex flex-col lg:flex-row gap-4 mb-8">
//           {mainImage && (
//             <div className="flex-shrink-0 w-full lg:w-2/3">
//               <PhotoView src={mainImage}>
//                 <img
//                   src={mainImage}
//                   alt="Main Property"
//                   className="w-full h-[500px] object-cover rounded-lg shadow-lg cursor-pointer"
//                   style={{ objectFit: 'cover' }}
//                 />
//               </PhotoView>
//             </div>
//           )}

//           <div className="flex flex-col w-full lg:w-1/3 gap-4">
//             <div className="relative grid grid-cols-1 gap-4">
//               {otherImages.slice(0, 3).map((url: string, index: number) => (
//                 <div key={index} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
//                   <PhotoView src={url}>
//                     <img
//                       src={url}
//                       alt={`Property Image ${index + 2}`}
//                       className="w-full h-32 object-cover transition-transform duration-300"
//                       style={{ aspectRatio: '1 / 1' }}
//                     />
//                   </PhotoView>
//                   {hasMoreImages && index === 2 && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center cursor-pointer">
//                       <PhotoView src={otherImages[3]}>
//                         <span className="text-xl font-bold">See More</span>
//                       </PhotoView>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </PhotoProvider>
//       <div className="flex space-x-4 ">
//         <div className="w-[70%] rounded-2xl">
//           <div className='mb-3 flex bg-gray-200 p-3 font-bold justify-evenly sticky top-0 rounded-lg shadow-md'>
//             {Object.keys(sectionRefs).map((section) => (
//               <div
//                 key={section}
//                 className={`${activeSection === section ? 'border-b-4 border-gray-400 text-gray-500' : 'text-DarkBlue'
//                   } cursor-pointer transition-colors duration-300  py-2 px-4 rounded-md`}
//                 onClick={() => scrollToSection(section)}
//               >
//                 {section}
//               </div>
//             ))}
//           </div>
//           <div ref={basicInfoRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
//             <h2 className="text-xl font-bold text-black border-b-2 pb-2">Basic Information</h2>
//             <div className="grid grid-cols-1 mt-3 gap-3">
//               <div className="flex items-center text-gray-600">
//                 <FaBuilding className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Property Type: </strong> {property.propertyType}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaMapMarkerAlt className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Address: </strong> {property.address}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaCompass className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Direction Tips: </strong> {property.directionTips}
//               </div>
//             </div>
//           </div>

//           <div ref={propertySpecsRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
//             <h2 className="text-xl font-bold text-black border-b-2 pb-2">Property Specifications</h2>
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               <div className="flex items-center text-gray-600">
//                 <FaBed className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Bedrooms:</strong> {property.bedrooms}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaShower className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Bathrooms:</strong> {property.bathrooms}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <MdBalcony className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Balconies:</strong> {property.balconies}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaRuler className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Total Area:</strong> {property.totalArea} sqft
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaBuilding className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Total Floors:</strong> {property.totalFloors}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaCalendarAlt className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Property Age:</strong> {property.propertyAge}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaCouch className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Furnisher Type:</strong> {property.furnisherType}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaCompass className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Facing:</strong> {property.facing}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaWindowMaximize className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Openings:</strong> {property.openings}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaWater className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800 px-1">Has Well:</strong> {property.hasWell ? 'Yes' : 'No'}
//               </div>
//             </div>
//           </div>
//           <div ref={furinsherRef} className="p-6 bg-gray-100 rounded-lg">
//             <h2 className="text-xl font-bold text-black border-b-2 pb-2">
//               Furinsher
//             </h2>
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               {Object.entries(property.electronics || {}).map(([item, count]) => (
//                 <div key={item} className="flex items-center text-gray-600">
//                     {(electronicsIcons as any)[item] || <FaTv />}
//                   <strong className="text-gray-800 px-1">{item}:</strong> {count}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div ref={featuresRef} className="p-6 my-8 bg-gray-100 rounded-lg">
//             <h2 className="text-xl font-bold text-black border-b-2 pb-2">Parking Space and Property Features</h2>
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               <div className="flex items-center text-gray-600">
//                 <FaCar className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800">Cars:</strong> {property?.noOfCars}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <FaMotorcycle className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800">Bikes:</strong> {property?.noOfBikes}
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <GiScooter className="mr-2 text-gray-800" />
//                 <strong className="text-gray-800">Scooters:</strong> {property?.noOfScooters}
//               </div>
//             </div>
//             {property?.propertyFeatures?.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Property Features:</h3>
//                 <ul className="list-disc list-inside text-gray-600 mt-2">
//                   {property?.propertyFeatures.map((feature: string, index: number) => (
//                     <li key={index}>{feature}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {property?.propertyAdvantages?.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Property Advantages:</h3>
//                 <ul className="list-disc list-inside text-gray-600 mt-2">
//                   {property?.propertyAdvantages.map((advantage: string, index: number) => (
//                     <li key={index}>{advantage}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-[30%] p-6 rounded-2xl bg-white shadow-lg sticky top-0 h-fit border border-gray-200">
//           <div className="mb-6 flex flex-col items-center space-y-4">
//             {property?.lookingFor === 'rent' ? (
//               <>
//                 <div className="text-center flex flex-col items-center space-y-4">
//                   <div className="flex flex-row items-center justify-center space-x-8">
//                     <div className="flex flex-col items-center">
//                       <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
//                         ₹{property?.rentAmount}
//                       </h2>
//                       <span className="text-sm text-gray-500">
//                         Rent/month
//                       </span>
//                     </div>
//                     <div className=" text-3xl items-center">
//                       |
//                     </div>
//                     <div className="flex flex-col items-center">
//                       <h3 className="text-4xl font-extrabold text-gray-800 mb-1">
//                         ₹{property?.depositAmount}
//                       </h3>
//                       <span className="text-sm text-gray-500">
//                         Deposit
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center">
//                 <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
//                   ₹{property?.sellPrice}
//                 </h2>
//                 <span className='text-sm text-gray-500'>
//                   Sell Price
//                 </span>
//               </div>
//             )}
//             <button onClick={handleBooking} className='rounded-full p-3 bg-BlueGray text-white w-full font-semibold hover:bg-darkBlue transition-all'>
//               Book now
//             </button>
//           </div>
//           <hr className='my-6 border-gray-300' />
//           <div className="text-center">
//             <h3 className='font-bold text-2xl text-gray-700 mb-4'>Property Owner</h3>
//             <p className='text-gray-600 mb-2'><strong>Name:</strong> {property?.createdBy?.name}</p>
//             <p className='text-gray-600 mb-2'><strong>Email:</strong> {property?.createdBy?.email}</p>
//             <p className='text-gray-600'><strong>Phone:</strong> {property?.createdBy?.phone}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetailsPage;




import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/property/propertyApi';
import { FaRegFlag, FaFan, FaRegWindowMaximize, FaLightbulb, FaBuilding, FaMapMarkerAlt, FaCompass, FaTv, FaRuler, FaCalendarAlt, FaCouch, FaWater, FaBed, FaShower, FaWindowMaximize, FaChair, FaCar, FaMotorcycle } from 'react-icons/fa';
import { MdBalcony, MdOutlineMicrowave } from "react-icons/md";
import { BiFridge, BiCabinet } from "react-icons/bi";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { PiFanThin } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { GiWashingMachine, GiVacuumCleaner, GiTable, GiScooter } from 'react-icons/gi';
import ReportModal from './ReportModal';
import loaderGif from '/assets/gifff.gif';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import ConnectWithOwnerButton from '../user/connectButton';
import ChatInterface from '../user/chat';

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


  const [chatId, setChatId] = useState<string | null>(null);

  const handleChatStart = (id: string) => {
    setChatId(id);
    console.log("Chat ID received:", id); // Debugging log

  };


  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const basicInfoRef = useRef<HTMLDivElement | null>(null);
  const propertySpecsRef = useRef<HTMLDivElement | null>(null);
  const furinsherRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    'Basic Information': basicInfoRef,
    'Property Specifications': propertySpecsRef,
    'Furinsher': furinsherRef,
    'Parking and Property Features': featuresRef,
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
  const mainImage = property?.mediaFiles[0];
  const otherImages = property?.mediaFiles.slice(1, 4);
  const hasMoreImages = property?.mediaFiles.length > 4;
  const handleBooking = () => {
    navigate(`/booking/${property._id}`);
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
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
     <div className="flex flex-col mb-6">
  <div className="flex justify-between items-start lg:items-center mb-6 flex-wrap">
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.propertyType}</h1>
      <p className="text-xl text-gray-600">{property.address}</p>
    </div>
    <div className="flex items-center space-x-4">
      <button
        onClick={openModal}
        className="border border-BlueGray text-BlueGray font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2"
      >
        <FaRegFlag className="text-BlueGray" />
        <span>Report</span>
      </button>
      <ConnectWithOwnerButton
        ownerId={property?.createdBy?._id}
        ownerName={property?.createdBy?.name}
        ownerPhoto={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fblack-contact-person-icon-on-white-background-vector-31046197&psig=AOvVaw3bz8wHQkL7E2YTdO3Mo4U3&ust=1724239471574000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDOnNu6g4gDFQAAAAAdAAAAABAE'}
        onChatStart={handleChatStart} />
      {chatId && <ChatInterface />}
    </div>
  </div>

  <ReportModal isOpen={isModalOpen} propertyId={property._id} onClose={closeModal} />
  
  <PhotoProvider>
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      {mainImage && (
        <div className="flex-shrink-0 w-full lg:w-2/3">
          <PhotoView src={mainImage}>
            <img
              src={mainImage}
              alt="Main Property"
              className="w-full h-[500px] object-cover rounded-lg shadow-lg cursor-pointer"
              style={{ objectFit: 'cover' }}
            />
          </PhotoView>
        </div>
      )}

      <div className="flex flex-col w-full lg:w-1/3 gap-4">
        <div className="relative grid grid-cols-1 gap-4">
          {otherImages.slice(0, 3).map((url:string, index:number) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <PhotoView src={url}>
                <img
                  src={url}
                  alt={`Property Image ${index + 2}`}
                  className="w-full h-32 object-cover transition-transform duration-300"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </PhotoView>
              {hasMoreImages && index === 2 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center cursor-pointer">
                  <PhotoView src={otherImages[3]}>
                    <span className="text-xl font-bold">See More</span>
                  </PhotoView>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </PhotoProvider>
</div>

<div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
  <div className="md:w-[70%] rounded-2xl">
  <div className='mb-3 flex bg-gray-200 p-3 font-bold justify-between sticky top-0 rounded-lg shadow-md overflow-x-auto'>
  {Object.keys(sectionRefs).map((section) => (
    <div
      key={section}
      className={`${
        activeSection === section
          ? 'border-b-4 border-gray-400 text-gray-500'
          : 'text-DarkBlue'
      } cursor-pointer transition-colors duration-300 py-2 px-4 rounded-md whitespace-nowrap`}
      onClick={() => scrollToSection(section)}
    >
      {section}
    </div>
  ))}
</div>


    {/* Basic Information Section */}
    <div ref={basicInfoRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-black border-b-2 pb-2">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
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

    {/* Property Specifications Section */}
    <div ref={propertySpecsRef} className="mb-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-black border-b-2 pb-2">Property Specifications</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {[
          { icon: <FaBed />, label: 'Bedrooms', value: property.bedrooms },
          { icon: <FaShower />, label: 'Bathrooms', value: property.bathrooms },
          { icon: <MdBalcony />, label: 'Balconies', value: property.balconies },
          { icon: <FaRuler />, label: 'Total Area', value: `${property.totalArea} sqft` },
          { icon: <FaBuilding />, label: 'Total Floors', value: property.totalFloors },
          { icon: <FaCalendarAlt />, label: 'Property Age', value: property.propertyAge },
          { icon: <FaCouch />, label: 'Furnisher Type', value: property.furnisherType },
          { icon: <FaCompass />, label: 'Facing', value: property.facing },
          { icon: <FaWindowMaximize />, label: 'Openings', value: property.openings },
          { icon: <FaWater />, label: 'Has Well', value: property.hasWell ? 'Yes' : 'No' },
        ].map(({ icon, label, value }, index) => (
          <div key={index} className="flex items-center text-gray-600">
            {icon}
            <strong className="text-gray-800 px-1">{label}:</strong> {value}
          </div>
        ))}
      </div>
    </div>

    {/* Furnisher Section */}
    <div ref={furinsherRef} className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-black border-b-2 pb-2">Furnisher</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Object.entries(property.electronics || {}).map(([item, count]) => (
          <div key={item} className="flex items-center text-gray-600">
            {(electronicsIcons as any)[item] || <FaTv />}
            <strong className="text-gray-800 px-1">{item}:</strong> {count}
          </div>
        ))}
      </div>
    </div>

    {/* Features Section */}
    <div ref={featuresRef} className="p-6 my-8 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-black border-b-2 pb-2">Parking and Property Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center text-gray-600">
          <FaCar className="mr-2 text-gray-800" />
          <strong className="text-gray-800">Cars:</strong> {property?.noOfCars}
        </div>
        <div className="flex items-center text-gray-600">
          <FaMotorcycle className="mr-2 text-gray-800" />
          <strong className="text-gray-800">Bikes:</strong> {property?.noOfBikes}
        </div>
        <div className="flex items-center text-gray-600">
          <GiScooter className="mr-2 text-gray-800" />
          <strong className="text-gray-800">Scooters:</strong> {property?.noOfScooters}
        </div>
      </div>

      {property?.propertyFeatures?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Property Features:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {property?.propertyFeatures.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {property?.propertyAdvantages?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Property Advantages:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {property?.propertyAdvantages.map((advantage: string, index: number) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>

  {/* Sidebar Section */}
  <div className="md:w-[30%] p-6 rounded-2xl bg-white shadow-lg sticky top-0 h-fit border border-gray-200">
    <div className="mb-6 flex flex-col items-center space-y-4">
      {property?.lookingFor === 'rent' ? (
        <>
          <div className="text-center flex flex-col items-center space-y-4">
            <div className="flex flex-row items-center justify-center space-x-8">
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
                  ₹{property?.rentAmount}
                </h2>
                <span className="text-sm text-gray-500">Rent/month</span>
              </div>
              <div className="text-3xl items-center">|</div>
              <div className="flex flex-col items-center">
                <h3 className="text-4xl font-extrabold text-gray-800 mb-1">
                  ₹{property?.depositAmount}
                </h3>
                <span className="text-sm text-gray-500">Deposit</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
            ₹{property?.sellPrice}
          </h2>
          <span className='text-sm text-gray-500'>Sell Price</span>
        </div>
      )}
      <button onClick={handleBooking} className='rounded-full p-3 bg-BlueGray text-white w-full font-semibold hover:bg-darkBlue transition-all'>
        Book now
      </button>
    </div>
    <hr className='my-6 border-gray-300' />
    <div className="text-center">
      <h3 className='font-bold text-2xl'>Contact Agent</h3>
      <p className='text-gray-600 text-sm mb-4'>Call or message the agent directly.</p>
      {/* <div className='flex justify-center'>
        <button onClick={handleCall} className='rounded-full p-3 bg-BlueGray text-white w-full font-semibold hover:bg-darkBlue transition-all'>
          Call
        </button>
        <button onClick={handleMessage} className='rounded-full p-3 bg-BlueGray text-white w-full font-semibold hover:bg-darkBlue transition-all ml-2'>
          Message
        </button>
      </div> */}
    </div>
  </div>
</div>

    </div>
  );
};

export default PropertyDetailsPage;




// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetAllPropertiesQuery } from '../../../../store/propertyApi';
// import loaderGif from '/assets/gifff.gif'; 

// interface Property {
//   _id: string;
//   propertyType: string;
//   city: string;
//   rentAmount?: number;
//   depositAmount?: number;
//   sellPrice?: number;
//   status: string;
//   mediaFiles: string[];
//   totalArea?: number;
//   sponsorship?: {
//     isSponsored: boolean;
//   };
// }

// const Properties = () => {
//   const navigate = useNavigate();
//   const { data: properties = [], error, isLoading } = useGetAllPropertiesQuery();
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     if (properties) {
//       setFilteredProperties(properties);
//     }
//   }, [properties]);

//   const handleNavigate = (id: string) => {
//     navigate(`/property/${id}`);
//   };

//   const handleSponsorNavigate = (id: string) => {
//     navigate(`/sponsor/${id}`);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return (
//     <div className="flex justify-center items-center h-screen">
//       <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold text-center mb-6">My Listed Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div
//               key={property._id}
//               onClick={() => handleNavigate(property._id)}
//               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
//               aria-label={`View details of ${property.propertyType} in ${property.city}`}
//             >
//               <div className="relative h-40">
//                 <img
//                   src={property.mediaFiles[0] || '/placeholder.jpg'}
//                   alt={property.propertyType}
//                   className="w-full h-full object-cover"
//                 />
//                 <span
//                   className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                     property.status
//                   )}`}
//                 >
//                   {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
//                 </span>
//                 {property.sponsorship?.isSponsored && (
//                   <span
//                     className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800"
//                   >
//                     Sponsored
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800">{property.propertyType}</h2>
//                 <p className="text-sm text-gray-600">{property.city}</p>
                
//                 {property.rentAmount && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.rentAmount.toLocaleString('en-IN')} / month
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Deposit: ₹{property.depositAmount?.toLocaleString('en-IN')}
//                     </p>
//                   </>
//                 )}
//                 {property.sellPrice && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.sellPrice.toLocaleString('en-IN')} 
//                     </div>
//                   </>
//                 )}
                
//                 {property.totalArea && (
//                   <p className="text-xs text-gray-500">Area: {property.totalArea} sq ft</p>
//                 )}

//                 {!property.sponsorship?.isSponsored && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering the parent div's onClick
//                       handleSponsorNavigate(property._id);
//                     }}
//                     className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
//                   >
//                     Make Sponsored
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-600">No properties found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'approved':
//       return 'bg-green-200 text-green-600';
//     case 'rejected':
//       return 'bg-red-200 text-red-600';
//     case 'pending':
//       return 'bg-blue-200 text-blue-600';
//     default:
//       return 'bg-gray-200 text-gray-600';
//   }
// };

// export default Properties;


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetAllPropertiesQuery } from '../../../../store/propertyApi';
// import loaderGif from '/assets/gifff.gif'; 
// interface BookedDetail {
//   userId: string;
//   bookingDate: Date;
//   userName: string;
// }

// interface Property {
//   _id: string;
//   propertyType: string;
//   city: string;
//   rentAmount?: number;
//   depositAmount?: number;
//   sellPrice?: number;
//   status: string;
//   mediaFiles: string[];
//   totalArea?: number;
//   sponsorship?: {
//     isSponsored: boolean;
//   };
//   bookedDetails?: BookedDetail[];
// }
// const Properties = () => {
//   const navigate = useNavigate();
//   const { data: properties = [], error, isLoading } = useGetAllPropertiesQuery({});
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     if (properties) {
//       setFilteredProperties(properties);
//     }
//   }, [properties]);

//   const handleNavigate = (id: string) => {
//     navigate(`/property/${id}`);
//   };

//   const handleSponsorNavigate = (id: string) => {
//     navigate(`/sponsor/${id}`);
//   };

//   if (error || isLoading) return (
//     <div className="flex justify-center items-center h-screen">
//       <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold text-center mb-6">My Listed Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div
//               key={property._id}
//               onClick={() => handleNavigate(property._id)}
//               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
//               aria-label={`View details of ${property.propertyType} in ${property.city}`}
//             >
//               <div className="relative h-40">
//                 <img
//                   src={property.mediaFiles[0] || '/placeholder.jpg'}
//                   alt={property.propertyType}
//                   className="w-full h-full object-cover"
//                 />
//                 <span
//                   className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                     property.status
//                   )}`}
//                 >
//                   {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
//                 </span>
//                 {property.sponsorship?.isSponsored && (
//                   <span
//                     className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800"
//                   >
//                     Sponsored
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800">{property.propertyType}</h2>
//                 <p className="text-sm text-gray-600">{property.city}</p>
                
//                 {property.rentAmount && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.rentAmount.toLocaleString('en-IN')} / month
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Deposit: ₹{property.depositAmount?.toLocaleString('en-IN')}
//                     </p>
//                   </>
//                 )}
//                 {property.sellPrice && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.sellPrice.toLocaleString('en-IN')} 
//                     </div>
//                   </>
//                 )}
                
//                 {property.totalArea && (
//                   <p className="text-xs text-gray-500">Area: {property.totalArea} sq ft</p>
//                 )}

//                 {property.bookedDetails && property.bookedDetails.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="text-sm font-semibold text-gray-800">Booking Details:</h3>
//                     {property.bookedDetails.map((detail, index) => (
//                       <div key={index} className="text-xs text-gray-500">
//                         <p>Booked by: {detail.userName}</p>
//                         <p>Date: {new Date(detail.bookingDate).toLocaleDateString()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {!property.sponsorship?.isSponsored && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering the parent div's onClick
//                       handleSponsorNavigate(property._id);
//                     }}
//                     className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
//                   >
//                     Make Sponsored
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-600">No properties found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'approved':
//       return 'bg-green-200 text-green-600';
//     case 'rejected':
//       return 'bg-red-200 text-red-600';
//     case 'pending':
//       return 'bg-blue-200 text-blue-600';
//     case 'booked': // Adding status for booked
//       return 'bg-purple-200 text-purple-600';
//     default:
//       return 'bg-gray-200 text-gray-600';
//   }
// };

// export default Properties;



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetAllPropertiesQuery } from '../../../../store/propertyApi';
// import loaderGif from '/assets/gifff.gif';
// import Modal from 'react-modal';

// const Properties = () => {
//   const navigate = useNavigate();
//   const { data: properties = [], error, isLoading } = useGetAllPropertiesQuery();
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

//   useEffect(() => {
//     if (properties) {
//       setFilteredProperties(properties);
//     }
//   }, [properties]);

//   const handleNavigate = (id: string) => {
//     navigate(`/property/${id}`);
//   };

//   const handleSponsorNavigate = (id: string) => {
//     navigate(`/sponsor/${id}`);
//   };

//   const openBookingModal = (property: Property) => {
//     setSelectedProperty(property);
//   };

//   const closeBookingModal = () => {
//     setSelectedProperty(null);
//   };

//   const handleCloseDeal = (propertyId: string, booking: BookedDetail) => {
//     // Check if full payment is made
//     if (booking.amountPaid === booking.totalAmount) {
//       // Call a function or dispatch an action to update the deal as closed
//       console.log(`Closing deal for ${booking.userName}`);

//       // Update logic to close the deal in the backend would go here
//     } else {
//       alert('Cannot close the deal until full payment is made.');
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return (
//     <div className="flex justify-center items-center h-screen">
//       <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold text-center mb-6">My Listed Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div
//               key={property._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
//             >
//               <div onClick={() => handleNavigate(property._id)} className="relative h-40">
//                 <img
//                   src={property.mediaFiles[0] || '/placeholder.jpg'}
//                   alt={property.propertyType}
//                   className="w-full h-full object-cover"
//                 />
//                 <span
//                   className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                     property.status
//                   )}`}
//                 >
//                   {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
//                 </span>
//                 {property.sponsorship?.isSponsored && (
//                   <span
//                     className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800"
//                   >
//                     Sponsored
//                   </span>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800">{property.propertyType}</h2>
//                 <p className="text-sm text-gray-600">{property.city}</p>

//                 {property.rentAmount && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.rentAmount.toLocaleString('en-IN')} / month
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Deposit: ₹{property.depositAmount?.toLocaleString('en-IN')}
//                     </p>
//                   </>
//                 )}
//                 {property.sellPrice && (
//                   <>
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                       ₹{property.sellPrice.toLocaleString('en-IN')}
//                     </div>
//                   </>
//                 )}
                
//                 {property.totalArea && (
//                   <p className="text-xs text-gray-500">Area: {property.totalArea} sq ft</p>
//                 )}

//                 {property.bookedDetails && property.bookedDetails.length > 0 && (
//                   <div className="mt-4">
//                     <div className="text-sm font-semibold text-gray-700">
//                       {property.bookedDetails.length} booking(s) 
//                     </div>
//                     <button
//                       onClick={() => openBookingModal(property)}
//                       className="mt-2 text-sm font-semibold text-blue-600 underline"
//                     >
//                       View Bookings
//                     </button>
//                   </div>
//                 )}

//                 {!property.sponsorship?.isSponsored && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); 
//                       handleSponsorNavigate(property._id);
//                     }}
//                     className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
//                   >
//                     Make Sponsored
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-600">No properties found</div>
//         )}
//       </div>

//       {selectedProperty && (
//         <Modal
//           isOpen={!!selectedProperty}
//           onRequestClose={closeBookingModal}
//           contentLabel="Booking Details"
//           className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <h2 className="text-2xl font-semibold mb-4">{selectedProperty.propertyType} - {selectedProperty.city}</h2>
//           <div className="space-y-4">
//             {selectedProperty.bookedDetails?.map((booking, index) => (
//               <div key={index} className="border-b pb-2">
//                 <p><strong>Booked by:</strong> {booking.userName}</p>
//                 <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
//                 {!booking.isDealClosed ? (
//                   <button
//                     onClick={() => handleCloseDeal(selectedProperty._id, booking, index)}
//                     className={`mt-2 py-1 px-3 rounded-lg text-white ${
//                       booking.amountPaid === booking.totalAmount
//                         ? 'bg-green-500 hover:bg-green-600'
//                         : 'bg-gray-400 cursor-not-allowed'
//                     }`}
//                     disabled={booking.amountPaid !== booking.totalAmount}
//                   >
//                     Close Deal
//                   </button>
//                 ) : (
//                   <p className="mt-2 text-green-700">Deal Closed</p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={closeBookingModal}
//             className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Close
//           </button>
//         </Modal>
//       )}
//     </div>
//   );
// };


// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'verified':
//       return 'bg-green-200 text-green-600';
//     case 'rejected':
//       return 'bg-red-200 text-red-600';
//     case 'pending':
//       return 'bg-blue-200 text-blue-600';
//     case 'booked': // Adding status for booked
//       return 'bg-purple-200 text-purple-600';
//     default:
//       return 'bg-gray-200 text-gray-600';
//   }
// };

// export default Properties;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPropertiesQuery } from '../../../../store/propertyApi';
import loaderGif from '/assets/gifff.gif';
import Modal from 'react-modal';
import toast from 'react-hot-toast'
const Properties = () => {
  const navigate = useNavigate();
  const { data: properties = [], error, isLoading } = useGetAllPropertiesQuery({});
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  useEffect(() => {
    if (properties) {
      setFilteredProperties(properties);
    }
  }, [properties]);

  const handleNavigate = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleSponsorNavigate = (id: string) => {
    navigate(`/sponsor/${id}`);
  };

  const openBookingModal = (property: Property) => {
    setSelectedProperty(property);
  };

  const closeBookingModal = () => {
    setSelectedProperty(null);
  };

  const handleCloseDeal = (propertyId: string, booking: BookedDetail, bookingIndex: number) => {
    if (booking.amountPaid === booking.totalAmount) {
      // Update the selected property state locally
      const updatedBookingDetails = [...(selectedProperty?.bookedDetails || [])];
      updatedBookingDetails[bookingIndex] = {
        ...booking,
        isDealClosed: true, // Mark the deal as closed
      };

      const updatedProperty = {
        ...selectedProperty!,
        status: 'booked', // Update property status to booked
        bookedDetails: updatedBookingDetails,
      };

      // Update the properties array
      setSelectedProperty(updatedProperty);
      setFilteredProperties((prev) =>
        prev.map((property) => (property._id === propertyId ? updatedProperty : property))
      );

      // Show a success toast message
      toast.success('Deal closed successfully!');
    } else {
      alert('Cannot close the deal until full payment is made.');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-6">My Listed Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div onClick={() => handleNavigate(property._id)} className="relative h-40">
                <img
                  src={property.mediaFiles[0] || '/placeholder.jpg'}
                  alt={property.propertyType}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
                {property.sponsorship?.isSponsored && (
                  <span className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800">
                    Sponsored
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{property.propertyType}</h2>
                <p className="text-sm text-gray-600">{property.city}</p>

                {property.rentAmount && (
                  <>
                    <div className="mt-2 text-sm font-medium text-green-600">
                      ₹{property.rentAmount.toLocaleString('en-IN')} / month
                    </div>
                    <p className="text-xs text-gray-500">
                      Deposit: ₹{property.depositAmount?.toLocaleString('en-IN')}
                    </p>
                  </>
                )}
                {property.sellPrice && (
                  <>
                    <div className="mt-2 text-sm font-medium text-green-600">
                      ₹{property.sellPrice.toLocaleString('en-IN')}
                    </div>
                  </>
                )}

                {property.totalArea && (
                  <p className="text-xs text-gray-500">Area: {property.totalArea} sq ft</p>
                )}

                {property.bookedDetails && property.bookedDetails.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-gray-700">
                      {property.bookedDetails.length} booking(s)
                    </div>
                    <button
                      onClick={() => openBookingModal(property)}
                      className="mt-2 text-sm font-semibold text-blue-600 underline"
                    >
                      View Bookings
                    </button>
                  </div>
                )}

                {!property.sponsorship?.isSponsored && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSponsorNavigate(property._id);
                    }}
                    className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Make Sponsored
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No properties found</div>
        )}
      </div>

      {selectedProperty && (
        <Modal
          isOpen={!!selectedProperty}
          onRequestClose={closeBookingModal}
          contentLabel="Booking Details"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {selectedProperty.propertyType} - {selectedProperty.city}
          </h2>
          <div className="space-y-4">
            {selectedProperty.bookedDetails?.map((booking, index) => (
              <div key={index} className="border-b pb-2">
                <p>
                  <strong>Booked by:</strong> {booking.userName}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                {!booking.isDealClosed ? (
                  <button
                    onClick={() => handleCloseDeal(selectedProperty._id, booking, index)}
                    className={`mt-2 py-1 px-3 rounded-lg text-white ${
                      booking.amountPaid === booking.totalAmount
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={booking.amountPaid !== booking.totalAmount}
                  >
                    Close Deal
                  </button>
                ) : (
                  <p className="mt-2 text-green-700">Deal Closed</p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={closeBookingModal}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
      return 'bg-green-200 text-green-600';
    case 'rejected':
      return 'bg-red-200 text-red-600';
    case 'pending':
      return 'bg-blue-200 text-blue-600';
    case 'booked':
      return 'bg-purple-200 text-purple-600';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

export default Properties;
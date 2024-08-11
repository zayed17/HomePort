// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useGetPropertyQuery } from '../../store/propertyApi';
// import { Calendar, utils } from 'react-modern-calendar-datepicker';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';

// const BookingMain: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: property, error, isLoading } = useGetPropertyQuery(id || '');
//   const navigate = useNavigate();
//   const [selectedDay, setSelectedDay] = useState(utils('en').getToday());

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <p className="text-red-600">Error loading property details. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <p className="text-gray-600">Property not found.</p>
//       </div>
//     );
//   }

//   const handleConfirmBooking = () => {
//     navigate('/booking-confirmation');
//   };

//   return (
//     <div className="container mx-auto p-8 min-h-screen">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Section */}	•	10% Deposit: ₹300,000.20

//         <div className="lg:w-2/3 bg-white rounded-lg shadow-lg transition transform  hover:shadow-xl">
//           <div className="relative">
//             <img
//               src={property.mediaFiles[0] || '/path/to/default/image.jpg'}
//               alt={property.title}
//               className="w-full h-80 object-cover rounded-t-lg"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-t-lg"></div>
//             <div className="absolute bottom-0 left-0 p-6 text-white">
//               <h1 className="text-4xl font-extrabold">{property.title}</h1>
//               <p className="text-lg">{property.address}</p>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="text-center mb-6">
//               <h2 className="text-3xl font-semibold text-gray-800 mb-2">
//                 {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
//               </h2>
//               <span className="text-lg text-gray-500">
//                 {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
//               </span>
//             </div>

//             <div className="text-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800">Property Address</h3>
//               <p className="text-gray-600">{property.address}</p>
//             </div>

//             <hr className="my-4 border-gray-300" />

//             <div className="text-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800">Property Owner</h3>
//               <p className="text-gray-600"><strong>Name:</strong> {property.createdBy.name}</p>
//               <p className="text-gray-600"><strong>Email:</strong> {property.createdBy.email}</p>
//               <p className="text-gray-600"><strong>Phone:</strong> {property.createdBy.phone}</p>
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
//               <ul className="list-disc list-inside text-gray-600">
//                 <li>Booking is subject to property availability.</li>
//                 <li>Ensure all payment details are accurate before confirming.</li>
//                 <li>Cancellations may be subject to a fee.</li>
//                 <li>Property viewing can be scheduled prior to booking confirmation.</li>
//                 <li>All bookings are final and non-transferable.</li>
//               </ul>
//               <button
//                 onClick={handleConfirmBooking}
//                 className="mt-6 w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out"
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="lg:w-1/3">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-8 transition transform hover:shadow-xl">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Booking Date</h2>
//             <Calendar
//               value={selectedDay}
//               onChange={setSelectedDay}
//               shouldHighlightWeekends
//               minimumDate={utils('en').getToday()}
//               calendarClassName="custom-calendar"
//               colorPrimary="#6b7280"
//             />
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:shadow-xl">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Booking Summary</h2>
//             <div className="text-center mb-4">
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                 {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
//               </h3>
//               <p className="text-gray-600">
//                 {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
//               </p>
//             </div>
//             <hr className="my-4 border-gray-300" />
//             <div className="text-center">
//               <p className="text-gray-600 mb-2"><strong>Address:</strong> {property.address}</p>
//               <p className="text-gray-600 mb-2"><strong>Owner:</strong> {property.createdBy.name}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingMain;





import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/propertyApi';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const BookingMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, error, isLoading } = useGetPropertyQuery(id || '');
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(utils('en').getToday());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-600 text-xl">Error loading property details. Please try again later.</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600 text-xl">Property not found.</p>
      </div>
    );
  }

  const adminFee = 500;
  const depositAmount = property.lookingFor === 'rent'
    ? property.rentAmount * 0.10
    : property.sellPrice * 0.05;
  const totalAmount = depositAmount + adminFee;

  const handleConfirmBooking = () => {
    navigate('/booking-confirmation', {
      state: {
        totalAmount,
        propertyTitle: property.title,
        selectedDay,
      },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Section */}
            <div className="md:w-2/3 p-8">
              <div className="relative mb-8">
                <img
                  src={property.mediaFiles[0] || '/path/to/default/image.jpg'}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h1 className="text-4xl font-extrabold">{property.title}</h1>
                  <p className="text-xl mt-2">{property.address}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <FaBed className="text-blue-500 mr-2" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-blue-500 mr-2" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-blue-500 mr-2" />
                    <span>{property.propertySize} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <span>Available Now</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Property Owner</h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <FaUserCircle className="text-4xl text-blue-500 mr-4" />
                    <div>
                      <p className="font-semibold text-lg">{property.createdBy.name}</p>
                      <p className="text-gray-600">Property Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="text-blue-500 mr-2" />
                    <span>{property.createdBy.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-2" />
                    <span>{property.createdBy.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Booking is subject to property availability.</li>
                  <li>Ensure all payment details are accurate before confirming.</li>
                  <li>Cancellations may be subject to a fee.</li>
                  <li>Property viewing can be scheduled prior to booking confirmation.</li>
                  <li>All bookings are final and non-transferable.</li>
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/3 bg-gray-50 p-8">
              <div className="sticky top-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Booking Date</h2>
                  <Calendar
                    value={selectedDay}
                    onChange={setSelectedDay}
                    shouldHighlightWeekends
                    minimumDate={utils('en').getToday()}
                    calendarClassName="custom-calendar"
                    colorPrimary="#3B82F6"
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking Summary</h2>
                  <div className="text-center mb-6">
                    <h3 className="text-4xl font-bold text-blue-600 mb-2">
                      {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
                    </h3>
                    <p className="text-gray-600">
                      {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
                    </p>
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div className="space-y-2">
                    <p className="flex justify-between"><span>Deposit Amount:</span> <strong>₹{depositAmount.toFixed(2)}</strong></p>
                    <p className="flex justify-between"><span>Admin Fee:</span> <strong>₹{adminFee.toFixed(2)}</strong></p>
                    <p className="flex justify-between text-lg font-bold"><span>Total Amount:</span> <strong>₹{totalAmount.toFixed(2)}</strong></p>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    className="mt-8 w-full p-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;
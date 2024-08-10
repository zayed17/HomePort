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

const BookingMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, error, isLoading } = useGetPropertyQuery(id || '');
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(utils('en').getToday());

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-600">Error loading property details. Please try again later.</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600">Property not found.</p>
      </div>
    );
  }

  // Define the fixed admin fee
  const adminFee = 500; // Fixed admin fee in INR

  // Calculate the deposit amount
  const depositAmount = property.lookingFor === 'rent'
    ? property.rentAmount * 0.10 // 10% of rent amount for renting
    : property.sellPrice * 0.05; // 5% of selling price for selling

  // Calculate the total amount to be paid
  const totalAmount = depositAmount + adminFee;

  const handleConfirmBooking = () => {
    // Navigate to the booking confirmation page with total amount
    navigate('/booking-confirmation', {
      state: {
        totalAmount,
        propertyTitle: property.title,
        selectedDay,
      },
    });
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-lg">
          <div className="relative">
            <img
              src={property.mediaFiles[0] || '/path/to/default/image.jpg'}
              alt={property.title}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-4xl font-extrabold">{property.title}</h1>
              <p className="text-lg mt-1">{property.address}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
              </h2>
              <span className="text-lg text-gray-500">
                {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Property Address</h3>
              <p className="text-gray-600">{property.address}</p>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Property Owner</h3>
              <p className="text-gray-600"><strong>Name:</strong> {property.createdBy.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {property.createdBy.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {property.createdBy.phone}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Booking is subject to property availability.</li>
                <li>Ensure all payment details are accurate before confirming.</li>
                <li>Cancellations may be subject to a fee.</li>
                <li>Property viewing can be scheduled prior to booking confirmation.</li>
                <li>All bookings are final and non-transferable.</li>
              </ul>
              <button
                onClick={handleConfirmBooking}
                className="mt-6 w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Booking Date</h2>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              shouldHighlightWeekends
              minimumDate={utils('en').getToday()}
              calendarClassName="custom-calendar"
              colorPrimary="#6b7280"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Booking Summary</h2>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {property.lookingFor === 'rent' ? `₹${property.rentAmount}` : `₹${property.sellPrice}`}
              </h3>
              <p className="text-gray-600">
                {property.lookingFor === 'rent' ? 'Rent/month' : 'Sell Price'}
              </p>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="text-center">
              <p className="text-gray-600 mb-2"><strong>Deposit Amount:</strong> ₹{depositAmount.toFixed(2)}</p>
              <p className="text-gray-600 mb-2"><strong>Admin Fee:</strong> ₹{adminFee.toFixed(2)}</p>
              <p className="text-gray-800 font-bold mb-2"><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
              <p className="text-gray-600 mb-2"><strong>Address:</strong> {property.address}</p>
              <p className="text-gray-600 mb-2"><strong>Owner:</strong> {property.createdBy.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;
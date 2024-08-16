import React from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaCreditCard, FaUser, FaCheckCircle } from 'react-icons/fa';
import { useGetBookedPropertiesQuery } from '../../../../store/bookingApi';

const BookedProperties = () => {
  const { data: bookedProperties = [], isLoading, isError, error } = useGetBookedPropertiesQuery();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading booked properties...</p>;
  }

  if (isError) {
    console.error('Error fetching booked properties:', error);
    return <p className="text-center text-red-500">Error fetching booked properties: {error.message}</p>;
  }

  if (bookedProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">No Booked Properties</h2>
        <p className="text-gray-600 text-center">You haven't booked any properties yet. Start exploring and book your dream property today!</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Booked Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {bookedProperties.map((booking) => (
          <div
            key={booking.transactionId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={booking.propertyId.image || 'https://via.placeholder.com/400x200'}
                alt="Property"
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 m-3 rounded-full text-sm font-semibold flex items-center">
                <FaCheckCircle className="mr-2" /> {booking.status.toUpperCase()}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-red-400 flex-shrink-0" />
                  <span className="text-sm">{booking.propertyId.address}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-3 text-green-400 flex-shrink-0" />
                  <span className="text-sm">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaRupeeSign className="mr-3 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm font-semibold">Amount Paid: ₹{Number(booking.amountPaid).toLocaleString()}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaCreditCard className="mr-3 text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{booking.paymentMethod.charAt(0).toUpperCase() + booking.paymentMethod.slice(1)}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaUser className="mr-3 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">Booked by: {booking.userId.name}</span>
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-right">
                <span className="text-xs text-gray-400">
                  Transaction ID: {booking.transactionId.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedProperties;
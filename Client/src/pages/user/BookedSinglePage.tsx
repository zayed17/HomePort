import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaCreditCard, FaUser, FaCheckCircle } from 'react-icons/fa';
import { useGetBookedPropertyByIdQuery } from '../../store/booking/bookingApi';
import { useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const { id } = useParams();
  const { data: booking, isLoading, isError, error } = useGetBookedPropertyByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading booking details...</p>;
  }

  if (isError) {
    console.error('Error fetching booking details:', error);
    return <p className="text-center text-red-500">Error fetching booking details: {error.message}</p>;
  }

  if (!booking) {
    return <p className="text-center text-gray-500">Booking not found.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate('/booked-properties')}
        className="mb-6 text-blue-600 hover:text-blue-800 text-lg"
      >
        &larr; Back to Booked Properties
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={booking.propertyId.image || 'https://via.placeholder.com/1600x800'}
            alt="Property"
            className="w-full h-72 object-cover"
          />
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <FaCheckCircle className="mr-2" /> {booking.status.toUpperCase()}
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Booking Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">Property Details</h2>
              <p className="text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <span className="text-lg">{booking.propertyId.address}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-500" />
                <span className="text-lg">Available From: {new Date(booking.propertyId.availableFrom).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaRupeeSign className="mr-2 text-yellow-500" />
                <span className="text-lg">Rent Amount: ₹{Number(booking.propertyId.rentAmount).toLocaleString()}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaRupeeSign className="mr-2 text-gray-500" />
                <span className="text-lg">Sell Price: ₹{Number(booking.propertyId.sellPrice).toLocaleString()}</span>
              </p>
              <div className="mt-4">
                <img
                  src={booking.propertyId.image || 'https://via.placeholder.com/800x400'}
                  alt="Property"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">Booking Information</h2>
              <p className="text-gray-700 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-500" />
                <span className="text-lg">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaRupeeSign className="mr-2 text-yellow-500" />
                <span className="text-lg font-semibold">Amount Paid: ₹{Number(booking.amountPaid).toLocaleString()}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaCreditCard className="mr-2 text-blue-500" />
                <span className="text-lg capitalize">Payment Method: {booking.paymentMethod}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <FaUser className="mr-2 text-purple-500" />
                <span className="text-lg">Booked by: {booking.userId.name}</span>
              </p>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-400">
                  Transaction ID: {booking.transactionId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useGetBookedPropertiesQuery } from '../../../../store/booking/bookingApi';
import { useNavigate } from 'react-router-dom';

const BookedProperties = () => {
  const { data: bookedProperties = [], isLoading, isError, error } = useGetBookedPropertiesQuery({});
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading booked properties...</p>;
  }

  if (isError) {
    console.error('Error fetching booked properties:', error);
    return <p className="text-center text-red-500">Error fetching booked properties: {error.message}</p>;
  }

  if (bookedProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">No Booked Properties</h2>
        <p className="text-gray-600 text-center">You haven't booked any properties yet. Start exploring and book your dream property today!</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-200 to-white">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Booked Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookedProperties.map((booking) => (
          <div
            key={booking.transactionId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer "
            onClick={() => navigate(`/booked-property/${booking._id}`)}
          >
            <div className="relative">
              <img
                src={booking.propertyId.image || 'https://via.placeholder.com/400x200'}
                alt="Property"
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
                <FaCheckCircle className="mr-2" /> {booking.status.toUpperCase()}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <p className="text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span className="text-sm font-medium">{booking.propertyId.address}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  <span className="text-sm font-medium">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <FaRupeeSign className="mr-2 text-yellow-500" />
                  <span className="text-sm font-semibold">Amount Paid: ₹{Number(booking.amountPaid).toLocaleString()}</span>
                </p>
                <div className="text-gray-700 space-y-2">
                  {booking.propertyId.rentAmount !== 0 && (
                    <>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-blue-500" />
                        <span className="text-sm font-semibold">Next Rent Due: {new Date(booking.nextRentDue).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">Balance Amount: </span>
                        <span className="text-sm font-semibold text-red-600 ml-1">₹{Number(booking.propertyId.depositAmount - booking.amountPaid + 5000).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">Rent Amount: </span>
                        <span className="text-sm font-semibold text-green-600 ml-1">₹{Number(booking.propertyId.rentAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">Deposit Amount: </span>
                        <span className="text-sm font-semibold text-blue-600 ml-1">₹{Number(booking.propertyId.depositAmount).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  {booking.propertyId.sellPrice !== 0 && (
                    <>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">Sell Amount: </span>
                        <span className="text-sm font-semibold text-green-600 ml-1">₹{Number(booking.propertyId.sellPrice).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">Balance Amount: </span>
                        <span className="text-sm font-semibold text-red-600 ml-1">₹{Number(booking.propertyId.sellPrice - booking.amountPaid + 5000).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedProperties;
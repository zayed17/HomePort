import { useState } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useGetBookedPropertiesQuery } from '../../../../store/booking/bookingApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';
import { Pagination } from 'antd';


const BookedProperties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const { data, isLoading, error } = useGetBookedPropertiesQuery({ page: currentPage, limit: pageSize});
  const navigate = useNavigate();




  if (isLoading || error) {
    return <Loader  />;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.properties.map((booking:any) => (
          <div key={booking.transactionId}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer "
            onClick={() => navigate(`/booked-property/${booking._id}`)}>
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
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.totalItems}
          onChange={(page) => setCurrentPage(page)}
          hideOnSinglePage
        />
      </div>
    </div>
  );
};

export default BookedProperties;

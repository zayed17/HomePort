import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllPropertiesQuery } from "../../../../store/property/propertyApi";
import Modal from "react-modal";
import { FaRegTimesCircle } from "react-icons/fa";
import { useCloseDealMutation } from "../../../../store/booking/bookingApi";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";
import { Pagination } from "antd";

interface Property {
  _id: string;
  propertyType: string;
  city: string;
  rentAmount?: number;
  depositAmount?: number;
  sellPrice?: number;
  totalArea?: number;
  status: string;
  mediaFiles: string[];
  sponsorship?: { isSponsored: boolean };
  bookedDetails?: BookedDetail[];
  lookingFor: string;
  reason?: string;
}

interface BookedDetail {
  _id: string;
  userName: string;
  bookingDate: string;
  amountPaid: number;
  totalAmount: number;
  isDealClosed: boolean;
}

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const { data, error, isLoading, refetch } = useGetAllPropertiesQuery({ page: currentPage, limit: pageSize});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [closeDeal] = useCloseDealMutation();

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

  const handleCloseDeal = async (bookingId: string) => {
    try {
      await closeDeal({ bookingId }).unwrap();
      toast.success("Booked property successfully closed!");
      closeBookingModal();
    } catch (error) {
      toast.error("Error closing the deal. Please try again.");
    }
  };
  const totalProperties = data?.totalCount;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleResubmit = async (propertyId: string) => {
    navigate(`/addproperty/${propertyId}`);
    refetch();
  };

  const renderPropertyCard = (property: Property) => {
    const isBooked = property.status === "booked";

    return (
      <div key={property._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div onClick={() => handleNavigate(property._id)} className="relative h-48 cursor-pointer" >
        <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span>Loading...</span> 
        </div>
      )}
      <img src={property.mediaFiles[0]}  alt={property.propertyType}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}onLoad={() => setLoading(false)} 
        onError={() => {
          setLoading(false);
        }}
      />
    </div>          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status )}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
          {!isBooked && property.sponsorship?.isSponsored && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-300 text-yellow-800">
              Sponsored
            </span>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {property.propertyType}
          </h2>
          <p className="text-md text-gray-600 mb-2">{property.city}</p>
          <div className="flex justify-between items-center mb-2">
            {property.rentAmount !== 0 && (
              <div>
                <div className="text-lg font-medium text-green-600">
                  ₹{(property.rentAmount ?? 0).toLocaleString("en-IN")} / month
                </div>
                <p className="text-xs text-gray-500">
                  Deposit: ₹{property.depositAmount?.toLocaleString("en-IN")}
                </p>
              </div>
            )}
            {property.sellPrice !== 0 && (
              <div className="text-lg font-medium text-green-600">
                ₹{(property.sellPrice ?? 0).toLocaleString("en-IN")}
              </div>
            )}
          </div>
          {property.totalArea && (
            <p className="text-sm text-gray-600 mb-2">
              Area: {property.totalArea} sq ft
            </p>
          )}
          {property.status === "rejected" && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-red-800 mb-2">
                Rejected Reason
              </h3>
              <p className="text-xs text-red-700 mb-2">{property.reason}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResubmit(property._id);
                }}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors text-md font-semibold"
              >
                Resubmit
              </button>
            </div>
          )}
          {isBooked ? (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Booking Details
              </h3>
              {property.bookedDetails && property.bookedDetails.length > 0 && (
                <div className="space-y-2">
                  {property.bookedDetails.slice(0, 2).map((booking, index) => (
                    <div key={index} className="text-xs text-blue-700">
                      <p className="font-medium">{booking.userName}</p>
                      <p>
                        Booked:{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                      <p>Paid: ₹{booking.amountPaid.toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                  {property.bookedDetails.length > 2 && (
                    <p className="text-xs text-blue-600 font-medium">
                      +{property.bookedDetails.length - 2} more bookings
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              {property.status !== "rejected" && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-md font-semibold text-blue-900">
                      {property.bookedDetails?.length ?? 0}{" "}
                      {(property.bookedDetails?.length ?? 0) > 1
                        ? "Bookings"
                        : "Booking"}
                    </div>
                    {property.bookedDetails &&
                      property.bookedDetails.length > 0 && (
                        <button
                          onClick={() => openBookingModal(property)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 border border-blue-500 rounded-full hover:bg-blue-100"
                        >
                          View All
                        </button>
                      )}
                  </div>
                  <div className="text-xs text-blue-700">
                    {property.bookedDetails
                      ?.slice(0, 1)
                      .map((booking, index) => (
                        <div key={index}>
                          <p className="mb-1">
                            <span className="font-medium">Latest Booking:</span>{" "}
                            {booking.userName}
                          </p>
                          <p className="text-xs text-blue-600">
                            Booked on{" "}
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {!property.sponsorship?.isSponsored &&
                property.status !== "rejected" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSponsorNavigate(property._id);
                    }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors text-md font-semibold"
                  >
                    Make Sponsored
                  </button>
                )}
            </>
          )}
        </div>
      </div>
    );
  };

  if (isLoading || error) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.properties.length > 0 ? (
          data.properties.map(renderPropertyCard)
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No properties found.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalProperties}
          pageSize={pageSize}
          onChange={handlePageChange}
          hideOnSinglePage
        />
      </div>

      {selectedProperty && (
        <Modal
          isOpen={!!selectedProperty}
          onRequestClose={closeBookingModal}
          ariaHideApp={false}
          contentLabel="Booking Details Modal"
          style={{
            content: {
              maxWidth: "600px",
              maxHeight: "60vh",
              margin: "auto",
              padding: "30px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          }}
        >
          <div className="flex justify-end">
            <FaRegTimesCircle
              className="cursor-pointer text-2xl text-gray-700 transition-colors duration-200"
              onClick={closeBookingModal}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Booking Details
          </h2>
          <div className="space-y-6">
            {selectedProperty?.bookedDetails?.map((booking, index) => (
              <div
                key={index}
                className="text-sm text-gray-800 bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="font-semibold text-gray-900">
                  {booking.userName}
                </p>
                <p>
                  Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>Paid: ₹{booking.amountPaid.toLocaleString("en-IN")}</p>
                {/* <p>Balance: ₹{(booking.totalAmount - booking.amountPaid).toLocaleString('en-IN')}</p> */}
                {!booking.isDealClosed && (
                  <button
                    onClick={() => handleCloseDeal(booking._id)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Close Deal
                  </button>
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "booked":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default Properties;

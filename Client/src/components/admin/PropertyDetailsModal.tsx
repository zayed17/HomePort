import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoMdHome, IoMdBed, IoMdPin, IoMdCar, IoMdImages } from 'react-icons/io';
import { useVerifyPropertyMutation, useRejectPropertyMutation } from '../../store/propertyApi';
import toast from 'react-hot-toast';

interface PropertyDetailsModalProps {
  property: any;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [verifyProperty] = useVerifyPropertyMutation();
  const [rejectProperty] = useRejectPropertyMutation();

  if (!property) return null;

  const handleVerify = async () => {
    try {
      await verifyProperty(property._id).unwrap();
      toast.success('Property verified successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to verify the property');
    }
  };

  const handleReject = async () => {
    try {
      await rejectProperty({ propertyId: property._id, reason: rejectReason }).unwrap();
      toast.success('Property rejected successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to reject the property');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-4xl h-5/6 rounded-lg overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 bg-gradient-to-r  to-DarkBlue from-LightdarkBlue text-white font-bold flex justify-between items-center">
          <h2 className="text-2xl flex items-center">
            <IoMdHome className="mr-3" />
            {property.propertyType}
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-200 transition duration-200">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSection title="Location" icon={<IoMdPin />}>
              <p>Address: {property.address}</p>
              <p>City: {property.city}</p>
            </InfoSection>

            {property.isForRent && (
              <InfoSection title="Rent Details" icon={<IoMdHome />}>
                <p>Rent: ${property.rentAmount}</p>
                <p>Negotiable: {property.isNegotiable ? 'Yes' : 'No'}</p>
                <p>Bills Included: {property.areBillsIncluded ? 'Yes' : 'No'}</p>
                <p>Deposit: ${property.depositAmount}</p>
              </InfoSection>
            )}

            {property.isForSale && (
              <InfoSection title="Sale Details" icon={<IoMdHome />}>
                <p>Price: ${property.salePrice}</p>
                <p>Negotiable: {property.isPriceNegotiable ? 'Yes' : 'No'}</p>
              </InfoSection>
            )}

            <InfoSection title="Property Details" icon={<IoMdHome />}>
              <p>Facing: {property.facing}</p>
              <p>Age: {property.propertyAge}</p>
              <p>Floors: {property.totalFloors}</p>
              <p>Area: {property.totalArea} sqft</p>
              <p>Furnishing: {property.furnisherType}</p>
              <p>Available From: {new Date(property.availableFrom).toLocaleDateString()}</p>
            </InfoSection>

            <InfoSection title="Rooms" icon={<IoMdBed />}>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Balconies: {property.balconies}</p>
              {property.otherRooms && (
                <div>
                  <p className="font-semibold mt-2">Other Rooms:</p>
                  <ul className="list-disc list-inside">
                    {property.otherRooms.map((room: string, index: number) => (
                      <li key={index}>{room}</li>
                    ))}
                  </ul>
                </div>
              )}
            </InfoSection>

            <InfoSection title="Features & Advantages" icon={<FaCheckCircle />}>
              {property.propertyFeatures && (
                <div>
                  <p className="font-semibold">Features:</p>
                  <ul className="list-disc list-inside">
                    {property.propertyFeatures.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {property.propertyAdvantages && (
                <div className="mt-2">
                  <p className="font-semibold">Advantages:</p>
                  <ul className="list-disc list-inside">
                    {property.propertyAdvantages.map((advantage: string, index: number) => (
                      <li key={index}>{advantage}</li>
                    ))}
                  </ul>
                </div>
              )}
            </InfoSection>

            <InfoSection title="Parking" icon={<IoMdCar />}>
              <p>Cars: {property.noOfCars}</p>
              <p>Scooters: {property.noOfScooters}</p>
              <p>Bikes: {property.noOfBikes}</p>
            </InfoSection>
          </div>

          <InfoSection title="Media" icon={<IoMdImages />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {property.mediaFiles.map((file: string, index: number) => (
                <img key={index} src={file} alt={`Property ${index + 1}`} className="w-full h-32 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300" />
              ))}
            </div>
          </InfoSection>

          <InfoSection title="Direction Tips" icon={<IoMdPin />}>
            <p>{property.directionTips}</p>
          </InfoSection>
        </div>

        <div className="p-6  flex justify-end space-x-4">
          <button 
            onClick={handleVerify} 
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition duration-300 flex items-center"
          >
            <FaCheckCircle className="mr-2" /> Verify
          </button>
          <button 
            onClick={() => setShowRejectReason(!showRejectReason)} 
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition duration-300 flex items-center"
          >
            <FaTimesCircle className="mr-2" /> Reject
          </button>
        </div>

        {showRejectReason && (
          <div className="p-6 bg-gray-100 border-t border-gray-200">
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Reason for rejection"
              rows={4}
            />
            <button 
              onClick={handleReject} 
              className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition duration-300 flex items-center"
            >
              <FaTimesCircle className="mr-2" /> Submit Rejection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-3 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h4>
    <div className="text-gray-700 space-y-1">{children}</div>
  </div>
);

export default PropertyDetailsModal;
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoMdHome, IoMdBed, IoMdPin } from 'react-icons/io';
import { useVerifyPropertyMutation ,useRejectPropertyMutation} from '../../store/propertyApi';
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
      alert('Property verified successfully');
      onClose();
    } catch (error) {
      console.error('Failed to verify the property: ', error);
    }
  };

  const handleReject = async () => {
    try {
      console.log(rejectReason,"checking")
      await rejectProperty({ propertyId: property._id, reason: rejectReason }).unwrap();
      alert('Property rejected successfully');
      onClose();
    } catch (error) {
      console.error('Failed to reject the property: ', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full md:w-3/4 lg:w-2/3 h-3/4 rounded-lg overflow-auto shadow-lg">
        <div className="p-4 bg-LightdarkBlue text-white font-bold rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg flex items-center">
            <IoMdHome className="mr-2" />
            Property Details
          </h2>
          <button onClick={onClose} className="text-white hover:text-blue-200 transition duration-200">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <h3 className="text-3xl font-bold mb-4">{property.propertyType}</h3>
          <p className="text-gray-700 mb-6">{property.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold flex items-center">
                <IoMdPin className="mr-2" />
                Address
              </h4>
              <p className="text-gray-800">{property.address}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">City</h4>
              <p className="text-gray-800">{property.city}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Rent Details</h4>
              <p className="text-gray-800">Rent Amount: ${property.rentAmount}</p>
              <p className="text-gray-800">Is Rent Negotiable: {property.isRentNegotiable ? 'Yes' : 'No'}</p>
              <p className="text-gray-800">Are Bills Included: {property.areBillsIncluded ? 'Yes' : 'No'}</p>
              <p className="text-gray-800">Deposit Amount: ${property.depositAmount}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Property Details</h4>
              <p className="text-gray-800">Facing: {property.facing}</p>
              <p className="text-gray-800">Property Age: {property.propertyAge}</p>
              <p className="text-gray-800">Total Floors: {property.totalFloors}</p>
              <p className="text-gray-800">Openings: {property.openings}</p>
              <p className="text-gray-800">Total Area: {property.totalArea} sqft</p>
              <p className="text-gray-800">Has Well: {property.hasWell ? 'Yes' : 'No'}</p>
              <p className="text-gray-800">Furnisher Type: {property.furnisherType}</p>
              <p className="text-gray-800">Eligibility: {property.eligibility}</p>
              <p className="text-gray-800">Available From: {new Date(property.availableFrom).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold flex items-center">
                <IoMdBed className="mr-2" />
                Rooms
              </h4>
              <p className="text-gray-800">Bedrooms: {property.bedrooms}</p>
              <p className="text-gray-800">Bathrooms: {property.bathrooms}</p>
              <p className="text-gray-800">Balconies: {property.balconies}</p>
              {property.otherRooms && (
                <>
                  <h5 className="mt-2 font-semibold">Other Rooms:</h5>
                  <ul className="list-disc list-inside pl-5">
                    {property.otherRooms.map((room: string, index: number) => (
                      <li key={index} className="text-gray-800">{room}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div>
              <h4 className="text-xl font-semibold">Features & Advantages</h4>
              {property.propertyFeatures && (
                <>
                  <h5 className="mt-2 font-semibold">Features:</h5>
                  <ul className="list-disc list-inside pl-5">
                    {property.propertyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="text-gray-800">{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              {property.propertyAdvantages && (
                <>
                  <h5 className="mt-2 font-semibold">Advantages:</h5>
                  <ul className="list-disc list-inside pl-5">
                    {property.propertyAdvantages.map((advantage: string, index: number) => (
                      <li key={index} className="text-gray-800">{advantage}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div>
              <h4 className="text-xl font-semibold">Parking</h4>
              <p className="text-gray-800">Cars: {property.noOfCars}</p>
              <p className="text-gray-800">Scooters: {property.noOfScooters}</p>
              <p className="text-gray-800">Bikes: {property.noOfBikes}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Media</h4>
              <div className="flex flex-wrap gap-2">
                {property.mediaFiles.map((file: string, index: number) => (
                  <img key={index} src={file} alt={`Media file ${index}`} className="w-24 h-24 object-cover rounded-md shadow" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Direction Tips</h4>
            <p className="text-gray-800">{property.directionTips}</p>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              onClick={handleVerify} 
              className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition duration-200"
            >
              Verify
            </button>
            <button 
              onClick={() => setShowRejectReason(!showRejectReason)} 
              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-200"
            >
              Reject
            </button>
          </div>
          {showRejectReason && (
            <div className="mt-4">
              <input
              type='text'
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Reason for rejection"
              />
              <button 
                onClick={handleReject} 
                className="mt-2 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-200"
              >
                Submit Rejection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
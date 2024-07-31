import React from 'react';
import { MdMeetingRoom, MdNature, MdThumbUp, MdDirectionsCar, MdDirections } from 'react-icons/md';
import { MultipleSelectWithCustomOption, otherRoomsOptions, propertyAdvantages, propertyFeatures,TextInput } from '../admin/ReuseableForm';

interface FormData {
  otherRooms: string[];
  propertyFeatures: string[];
  propertyAdvantages: string[];
  noOfCars: number;
  noOfScooters: number;
  noOfBikes: number;
  directionTips: string;
}

const AdditionalDetailsForm: React.FC = ({ formData, setFormData }) => {

  const handleRoomChange = (selectedRooms: string[]) => {
    setFormData({
      ...formData,
      otherRooms: selectedRooms,
    });
  };

  const handleFeatureChange = (selectedFeatures: string[]) => {
    setFormData({
      ...formData,
      propertyFeatures: selectedFeatures,
    });
  };

  const handleAdvantageChange = (selectedAdvantages: string[]) => {
    setFormData({
      ...formData,
      propertyAdvantages: selectedAdvantages,
    });
  };

  const handleParkingChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'noOfCars' | 'noOfScooters' | 'noOfBikes') => {
    const value = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      [field]: value >= 0 ? value : 0,
    });
  };

  const handleDirectionTipsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      directionTips: e.target.value,
    });
  };


  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Property Additional Details</h2>
      <form className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdMeetingRoom className="mr-2 text-gray-600" /> Other Rooms
          </h3>
          <MultipleSelectWithCustomOption
            initialOptions={otherRoomsOptions}
            selectedValues={formData.otherRooms || []}
            onChange={handleRoomChange}
            placeholder="Add other rooms"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdNature className="mr-2 text-gray-600" /> Property Features
          </h3>
          <MultipleSelectWithCustomOption
            initialOptions={propertyFeatures}
            selectedValues={formData.propertyFeatures || []}
            onChange={handleFeatureChange}
            placeholder="Add property features"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdThumbUp className="mr-2 text-gray-600" /> Property Advantages
          </h3>
          <MultipleSelectWithCustomOption
            initialOptions={propertyAdvantages}
            selectedValues={formData.propertyAdvantages || []}
            onChange={handleAdvantageChange}
            placeholder="Add property advantages"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdDirectionsCar className="mr-2 text-gray-600" /> Parking Area
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfCars">Number of Cars:</label>
              <TextInput type='number' name='noOfCars' value={formData.noOfCars} onChange={(e) => handleParkingChange(e, 'noOfCars')} placeholder="Enter number of cars" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfScooters">Number of Scooters:</label>
              <TextInput type='number' name='noOfScooters' value={formData.noOfScooters} onChange={(e) => handleParkingChange(e, 'noOfScooters')} placeholder="Enter number of scooters" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfBikes">Number of Bikes:</label>
              <TextInput type='number' name='noOfBikes' value={formData.noOfBikes} onChange={(e) => handleParkingChange(e, 'noOfBikes')} placeholder="Enter number of bikes" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdDirections className="mr-2 text-gray-600" /> Direction Tips
          </h3>
          <textarea
            value={formData.directionTips}
            onChange={handleDirectionTipsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            placeholder="Provide direction tips for customers"
          />
        </div>
      </form>
    </div>
  );
};


export default AdditionalDetailsForm;


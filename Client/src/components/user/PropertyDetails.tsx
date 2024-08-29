import { MdHome, MdDirections, MdUpdate, MdHotel, MdCropSquare, MdDescription } from 'react-icons/md';
import { GiWell, GiSofa } from 'react-icons/gi';
import { FaBuilding, FaDoorOpen } from 'react-icons/fa';

import '../../style/property.css';
import { SelectButton, TextInput, propertyTypes, propertyFacings, propertyAges, furnisherTypes, electronicsList, hasWell } from '../admin/ReuseableForm';
import { ChangeEvent } from 'react';
const selectableElectronicsList = [
  'Fridge', 'Microwave', 'Washing Machine', 'Stove', 'Vacuum Cleaner', 'TV', 'BathTub', 'Chimney', 'Exhaust Fan', 
];

const PropertyDetailsForm = ({ formData, setFormData }) => {


  const handlePropertyTypeChange = (propertyType: string) => {
    setFormData({
      ...formData,
      propertyType,
    });
  };

  const handleFacingChange = (facing: string) => {
    setFormData({
      ...formData,
      facing,
    });
  };

  const handlePropertyAgeChange = (propertyAge: string) => {
    setFormData({
      ...formData,
      propertyAge,
    });
  };

  const handleTotalFloorsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const totalFloors = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      totalFloors: totalFloors >= 0 ? totalFloors : 0,
    });
  };

  const handleOpeningsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const openings = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      openings: openings >= 0 ? openings : 0,
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = parseInt(e.target.value, 10);
    setFormData({ ...formData, [fieldName]: value >= 0 ? value : 0 });
  };

  const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const totalArea = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      totalArea: totalArea >= 0 ? totalArea : 0,
    });
  };

  const handleWellChange = (hasWell: string) => {
    setFormData({
      ...formData,
      hasWell,
    });
  };

  const handleFurnisherTypeChange = (furnisherType: string) => {
    setFormData({
      ...formData,
      furnisherType,
    });
  };



  const handleElectronicsChange = (electronic: string, count: number) => {
    const updatedElectronics = { ...formData.electronics, [electronic]: count >= 0 ? count : 0 };
    setFormData({
      ...formData,
      electronics: updatedElectronics,
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Property Details</h2>
      <form>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdHome className="mr-1 text-gray-600" /> Property Type
          </h3>
          <div className="flex flex-wrap gap-4">
            <SelectButton options={propertyTypes} selectedValue={formData.propertyType} onChange={handlePropertyTypeChange} />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdDirections className="mr-1 text-gray-600" /> Property Facing
          </h3>
          <div className="flex flex-wrap gap-4">
            <SelectButton options={propertyFacings} selectedValue={formData.facing} onChange={handleFacingChange} />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdUpdate className="mr-1 text-gray-600" /> Property Age
          </h3>
          <div className="flex flex-wrap gap-4">
            <SelectButton options={propertyAges} selectedValue={formData.propertyAge} onChange={handlePropertyAgeChange} />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdHotel className="mr-1 text-gray-600" /> Number of Rooms
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">Number of bedrooms:</label>
              <TextInput type='number' name='bedrooms' value={formData.bedrooms} onChange={(e) => handleInputChange(e, 'bedrooms')} placeholder="Enter number of Bedrooms" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">Number of bathrooms:</label>
              <TextInput type='number' name='bathrooms' value={formData.bathrooms} onChange={(e) => handleInputChange(e, 'bathrooms')} placeholder="Enter number of Bathrooms" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="balconies">Number of balconies:</label>
              <TextInput type='number' name='balconies' value={formData.balconies} onChange={(e) => handleInputChange(e, 'balconies')} placeholder="Enter number of Balconies" />
            </div>
          </div>
        </div>
        <div className="mb-8 w-1/2">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdCropSquare className="mr-1 text-gray-600" /> Total Area (sq. feet)
          </h3>
          <TextInput type='number' name="totalArea" value={formData.totalArea} onChange={handleAreaChange} placeholder="Enter total area in sq. feet" />
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <GiWell className="mr-1 text-gray-600" />Does the property have a well?
          </h3>
          <div className="flex space-x-4">
            <SelectButton options={hasWell} selectedValue={formData.hasWell} onChange={handleWellChange} />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <GiSofa className="mr-1 text-gray-600" />Furnisher Type
          </h3>
          <div className="flex flex-wrap gap-4">
            <SelectButton options={furnisherTypes} selectedValue={formData.furnisherType} onChange={handleFurnisherTypeChange} />
          </div>
        </div>
        {formData.furnisherType && formData.furnisherType !== 'Unfurnished' && (
  <div className="mb-8">
    <label className="block text-gray-700 mb-2 font-semibold text-lg">Electronics and Home items</label>
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {electronicsList.map((electronic) => (
          <div key={electronic} className="flex flex-col items-center">
            <label className="block text-gray-700 mb-1 capitalize">{electronic}</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleElectronicsChange(electronic, (formData.electronics?.[electronic] || 0) - 1)}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-8 text-center">{formData.electronics?.[electronic] || 0}</span>
              <button
                type="button"
                onClick={() => handleElectronicsChange(electronic, (formData.electronics?.[electronic] || 0) + 1)}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {selectableElectronicsList.map((electronic) => (
          <div key={electronic} className="flex items-center">
            <input
              type="checkbox"
              id={electronic}
              value={electronic}
              checked={!!formData.electronics?.[electronic]}
              onChange={() =>
                handleElectronicsChange(electronic, formData.electronics?.[electronic] ? 0 : 1)
              }
              className="mr-2"
            />
            <label htmlFor={electronic} className="text-gray-700 capitalize">{electronic}</label>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaBuilding className="mr-1 text-gray-600" />Total Floors
            </h3>
            <TextInput type='number' name="totalFloors" value={formData.totalFloors} onChange={handleTotalFloorsChange} placeholder="Enter total number of floors" />
          </div>
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaDoorOpen className="mr-1 text-gray-600" />Number of Openings
            </h3>
            <TextInput type='number' name="openings" value={formData.openings} onChange={handleOpeningsChange} placeholder="Enter number of openings" />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <MdDescription className="mr-1 text-gray-600" />Description
          </h3>
          <TextInput type='text' name="description" value={formData.description} onChange={handleDescriptionChange} placeholder="Enter property description" />
        </div>
      </form>
    </div>
  );
};

export default PropertyDetailsForm;
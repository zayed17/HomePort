import React from 'react';

const PropertyDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ml-4 mt-8 md:mt-0 flex-1 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Property Name</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter property name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property Type</label>
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter property type"
          />
        </div>
      </form>
    </div>
  );
};

export default PropertyDetailsForm;
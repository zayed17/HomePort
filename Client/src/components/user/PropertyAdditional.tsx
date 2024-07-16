// components/user/AdditionalDetailsForm.js
import React from 'react';

const AdditionalDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Additional Information</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
      </form>
    </div>
  );
};

export default AdditionalDetailsForm;
// components/user/RentDetailsForm.js
import React from 'react';

const RentDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rent Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Monthly Rent</label>
          <input
            type="text"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deposit Amount</label>
          <input
            type="text"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
      </form>
    </div>
  );
};

export default RentDetailsForm;
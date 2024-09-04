import React from 'react';
import { SelectButton, TextInput } from '../admin/ReuseableForm';
import { FaHandshake, FaTools, FaCheckCircle, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';



const eligibilityOptions = [
  'Anyone',
  'Family',
  'Bachelors (Females)',
  'Bachelors (Males)'
];

interface PropertyRentProps {
  formData: any;
  setFormData: any
}


const PropertyRent: React.FC<PropertyRentProps> = ({ formData, setFormData }:any) => {
  const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rentAmount: parseFloat(e.target.value),
    });
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      depositAmount: parseFloat(e.target.value),
    });
  };

  const handleNegotiableChange = (value: string) => {
    setFormData({
      ...formData,
      isNegotiable: value,
    });
  };

  const handleBillsChange = (value: string) => {
    setFormData({
      ...formData,
      areBillsIncluded: value,
    });
  };

  const handleEligibilityChange = (value: string) => {
    setFormData({
      ...formData,
      eligibility: value,
    });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value,"chekcing",typeof(e.target.value))
    setFormData({
      ...formData,
      availableFrom: e.target.value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-5 text-center">Rent Details</h2>
      <form>
        <div className='grid grid-cols-2 gap-6'>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaDollarSign className="mr-1 text-gray-600" /> Rent Details
            </h3>
            <TextInput type="number" name="rentAmount" value={formData.rentAmount} onChange={handleRentChange} placeholder="Enter rent amount"/>
          </div>
          <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FaDollarSign className="mr-1 text-gray-600" />Deposit Amount
            </h3>
            <TextInput type="number" name="depositAmount" value={formData.depositAmount} onChange={handleDepositChange} placeholder="Enter deposit amount"/>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <FaHandshake className="mr-1 text-gray-600" />Is Rent Negotiable?
          </h3>
          <SelectButton
            options={['Yes', 'No']}
            selectedValue={formData.isNegotiable}
            onChange={handleNegotiableChange}
          />
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <FaTools className="mr-2 text-gray-600" />
            Utilities Included?
          </h3>
          <SelectButton
            options={['Yes', 'No']}
            selectedValue={formData.areBillsIncluded}
            onChange={handleBillsChange}
          />
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <FaCheckCircle className="mr-1 text-gray-600" />Eligibility
          </h3>
          <SelectButton
            options={eligibilityOptions}
            selectedValue={formData.eligibility}
            onChange={handleEligibilityChange}
          />
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-600" />Available From
          </h3>
          <TextInput
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleAvailabilityChange}
            placeholder="Select date"
          />
        </div>
      </form>
    </div>
  );
};

export default PropertyRent;

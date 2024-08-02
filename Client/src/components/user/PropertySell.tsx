import React from 'react';
import { SelectButton, TextInput } from '../admin/ReuseableForm';
import { FaHandshake, FaTools, FaCheckCircle, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const eligibilityOptions = [
    'Anyone',
    'Family',
    'Bachelors (Females)',
    'Bachelors (Males)'
];

const PropertySell: React.FC = ({ formData, setFormData }) => {
    const handleSellPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            sellPrice: parseFloat(e.target.value),
        });
    };

    const handleNegotiableChange = (value: string) => {
        setFormData({
            ...formData,
            isNegotiable: value,
        });
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            availableFrom: e.target.value,
        });
    };

    const handlePropertyConditionChange = (value: string) => {
        setFormData({
            ...formData,
            propertyCondition: value,
        });
    };

    const handleEligibilityChange = (value: string) => {
        setFormData({
            ...formData,
            eligibility: value,
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-5 text-center">Sell Details</h2>
            <form>
                <div className='grid grid-cols-2 gap-6'>
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <FaDollarSign className="mr-1 text-gray-600" /> Selling Price
                        </h3>
                        <TextInput type="number" name="sellPrice" value={formData.sellPrice} onChange={handleSellPriceChange} placeholder="Enter selling price" />
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <FaHandshake className="mr-1 text-gray-600" /> Is Price Negotiable?
                        </h3>
                        <SelectButton
                            options={['Yes', 'No']}
                            selectedValue={formData.isNegotiable}
                            onChange={handleNegotiableChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-600" /> Possession Date
                    </h3>
                    <TextInput
                        type="date"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleAvailabilityChange}
                        placeholder="Select date"
                    />
                </div>
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <FaTools className="mr-1 text-gray-600" /> Property Condition
                    </h3>
                    <SelectButton
                        options={['Excellent', 'Good', 'Fair', 'Needs Renovation']}
                        selectedValue={formData.propertyCondition}
                        onChange={handlePropertyConditionChange}
                    />
                </div>
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <FaCheckCircle className="mr-1 text-gray-600" /> Eligibility
                    </h3>
                    <SelectButton
                        options={eligibilityOptions}
                        selectedValue={formData.eligibility}
                        onChange={handleEligibilityChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default PropertySell;
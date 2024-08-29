import React, { useState, ChangeEvent } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useReportPropertyMutation } from '../../store/property/propertyApi';

interface ReportModalProps {
  propertyId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({propertyId, isOpen, onClose }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [report] = useReportPropertyMutation()

  const handleReasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async() => {
   await report({reason:selectedReason,description,propertyId}).unwrap()
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative bg-white w-[30%] p-6 rounded-lg shadow-lg transition-transform duration-400 z-60 ${
          isOpen ? 'translate-y-0' : '-translate-y-10'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Report Property</h2>
          <FaTimes
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>
        <p className="text-gray-600 mb-4">
          Please select a reason and provide a description for reporting this property.
        </p>
        <select
          value={selectedReason}
          onChange={handleReasonChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="" disabled>
            Select a reason
          </option>
          <option value="Misleading information">Misleading information</option>
          <option value="Fraudulent listing">Fraudulent listing</option>
          <option value="Inappropriate content">Inappropriate content</option>
          <option value="Spam">Spam</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows={4}
          placeholder="Describe the issue..."
        ></textarea>

        <button
          className="bg-LightdarkBlue text-white py-2 px-4 rounded-md w-full hover:bg-darkBlue transition-colors"
          onClick={handleSubmit}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
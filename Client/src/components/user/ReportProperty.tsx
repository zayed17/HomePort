import React, { useState } from 'react';

interface ReportPropertyPageProps {
  propertyId: string;
  onReportSubmit: (reportDetails: { reason: string; additionalInfo: string }) => void;
  onCancel: () => void;
}

const ReportPropertyPage: React.FC<ReportPropertyPageProps> = ({ propertyId, onReportSubmit, onCancel }) => {
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim() === '') {
      alert('Please select a reason for reporting.');
      return;
    }
    onReportSubmit({ reason, additionalInfo });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Property</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="reason">
            Reason for Reporting
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a reason</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
            <option value="Scam">Scam</option>
            <option value="False Information">False Information</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="additionalInfo">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Provide any additional details..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportPropertyPage;
import React from 'react';

interface ReportDetailsModalProps {
  report: any;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Report Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-md font-semibold">Title</h3>
            <p>{report.title || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Description</h3>
            <p>{report.description || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Status</h3>
            <p>{report.status || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Date</h3>
            <p>{new Date(report.date).toLocaleDateString() || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
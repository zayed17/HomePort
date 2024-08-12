import React from 'react';
import { FaTimes, FaCalendarAlt, FaClipboardList, FaInfoCircle ,FaCheck} from 'react-icons/fa';

interface ReportDetailsModalProps {
  report: any;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose }) => {
  console.log(report,"report checking")
  if (!report) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r  to-DarkBlue from-LightdarkBlue p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
              Report Details
            </h2>
            <button onClick={onClose} className="text-white transition duration-200">
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaClipboardList className="mr-2 text-red-500" />
              Reason
            </h3>
            <p className="text-gray-700">{report.reason || 'N/A'}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-500" />
              Description
            </h3>
            <p className="text-gray-700">{report.description || 'N/A'}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="bg-gray-100 p-4 rounded-lg flex-grow mr-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-500" />
                Date
              </h3>
              <p className="text-gray-700"> {new Date(report.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', }) || 'N/A'}</p>            
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-grow">
              <h3 className="text-lg font-semibold flex items-center mb-2">
              <FaCheck className="mr-2 text-green-500" />
                Status
                </h3>
              <p className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                {report.status || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition duration-300 flex items-center" >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
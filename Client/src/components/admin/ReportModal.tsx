import React from 'react';
import { FaTimes, FaCalendarAlt, FaClipboardList, FaInfoCircle, FaCheck } from 'react-icons/fa';
import { Modal, Button } from 'antd';

interface ReportDetailsModalProps {
  report: any;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose }) => {
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
    <Modal
      visible={true}
      title="Report Details"
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} type="primary">
          <FaTimes className="mr-2" /> Close
        </Button>
      ]}
      centered
      width={600}
      bodyStyle={{
        padding: '20px',
        backgroundColor: '#fff', // Ensure the background color fits with your design
      }}
      className="report-details-modal"
    >
      <div className="space-y-6">
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
            <p className="text-gray-700">
              {new Date(report.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) || 'N/A'}
            </p>
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
    </Modal>
  );
};

export default ReportDetailsModal;
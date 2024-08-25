import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaBell, FaSpinner, FaExclamationCircle, FaHome, FaFileAlt, FaTimes } from 'react-icons/fa';
import { useGetPendingPropertiesQuery, useGetReportsQuery } from '../../store/propertyApi';
import PropertyDetailsModal from './PropertyDetailsModal';
import ReportDetailsModal from './ReportModal';
import socket from '../../helpers/socket';

const Notification: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const { data: properties = [], isLoading: isLoadingProperties, isError: isErrorProperties, refetch: refetchProperties } = useGetPendingPropertiesQuery({});
  const { data: reports = [], isLoading: isLoadingReports, isError: isErrorReports, refetch: refetchReports } = useGetReportsQuery({});

  useEffect(() => {
    if (!isLoadingProperties && !isLoadingReports) {
      setNotifications([...properties, ...reports]);
    }
  }, [properties, reports, isLoadingProperties, isLoadingReports]);

  useEffect(() => {
    const handleNewReport = (report: any) => {
      console.log('New report received:', report);
      setNotifications(prevNotifications => [report, ...prevNotifications]);
    };

    socket?.on('newReport', handleNewReport);

    return () => {
      socket?.off('newReport', handleNewReport);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
    refetchProperties();
    refetchReports();
  };

  const renderModal = () => {
    if (!selectedNotification) return null;

    if (selectedNotification.address) {
      return <PropertyDetailsModal property={selectedNotification} onClose={handleCloseModal} />;
    } else {
      return <ReportDetailsModal report={selectedNotification} onClose={handleCloseModal} />;
    }
  };

  const getNotificationTypeInfo = (item: any) => {
    if (item.address) {
      return { icon: <FaHome className="text-2xl" />, bgColor: 'bg-blue-100', textColor: 'text-blue-500' };
    } else {
      return { icon: <FaFileAlt className="text-2xl" />, bgColor: 'bg-yellow-100', textColor: 'text-yellow-500' };
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDropdownToggle}
        className="relative focus:outline-none bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 "
      >
        <FaBell className="text-gray-600 text-2xl hover:text-DarkBlue transition-colors duration-300" /> 
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center animate-bounce shadow-md">
            {notifications.length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right z-50">
          <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r to-DarkBlue from-LightdarkBlue text-white">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button onClick={handleDropdownToggle} className="text-white hover:text-gray-200 transition-colors duration-200">
              <FaTimes />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {(isLoadingProperties || isLoadingReports) && (
              <div className="flex items-center justify-center p-8">
                <FaSpinner className="animate-spin text-blue-500 text-3xl mr-3" />
                <p className="text-gray-600 font-medium">Loading notifications...</p>
              </div>
            )}
            {(isErrorProperties || isErrorReports) && (
              <div className="flex items-center justify-center p-8 text-red-500">
                <FaExclamationCircle className="text-3xl mr-3" />
                <p className="font-medium">Error loading notifications</p>
              </div>
            )}
            {(!isLoadingProperties && !isLoadingReports && notifications.length === 0) && (
              <p className="p-8 text-gray-500 text-center font-medium">No notifications</p>
            )}
            {(!isLoadingProperties && !isLoadingReports && notifications.length > 0) && (
              <ul className="divide-y divide-gray-200">
                {notifications.map((item: any) => {
                  const { icon, bgColor, textColor } = getNotificationTypeInfo(item);
                  return (
                    <li key={item._id} className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={() => handleNotificationClick(item)} >
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bgColor} ${textColor}`}>
                          {icon}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.address || item.reason}</h4>
                          <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(item.createdAt))} ago</p>
                        </div>
                        <span className="ml-4 px-3 py-1 bg-blue-100 text-Darkfrom-DarkBlue rounded-full text-xs font-medium hover:bg-blue-200 transition-colors duration-200">
                          View
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
      {renderModal()}
    </div>
  );
};

export default Notification;
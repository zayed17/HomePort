// import React, { useState, useEffect } from 'react';
// import { FaBell } from 'react-icons/fa';
// import { useGetPendingPropertiesQuery, useGetReportsQuery } from '../../store/propertyApi';
// import PropertyDetailsModal from './PropertyDetailsModal';
// import socket from '../../helpers/socket';

// const Notification: React.FC = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState<any>(null);
//   const [notifications, setNotifications] = useState<any[]>([]);

//   const { data: properties = [], isLoading: isLoadingProperties, isError: isErrorProperties, refetch: refetchProperties } = useGetPendingPropertiesQuery();
  
//   const { data: reports = [], isLoading: isLoadingReports, isError: isErrorReports, refetch: refetchReports } = useGetReportsQuery();

//   useEffect(() => {
//     setNotifications([...properties, ...reports]);

//     socket.on('newReport', (report) => {
//       console.log('New report received:', report);
//       setNotifications(prevNotifications => [report, ...prevNotifications]);
//     });

//     return () => {
//       socket.off('newReport');
//     };
//   }, [properties, reports]);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handlePropertyClick = (property: any) => {
//     setSelectedProperty(property);
//   };

//   const handleCloseModal = () => {
//     setSelectedProperty(null);
//     refetchProperties();
//     refetchReports();
//   };

//   return (
//     <div className="relative">
//       <button onClick={handleDropdownToggle} className="relative focus:outline-none">
//         <FaBell className="text-gray-800 text-2xl hover:text-blue-600 transition-colors duration-300" /> 
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center">
//             {notifications.length}
//           </span>
//         )}
//       </button>
//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
//           <div className="text-center py-2 bg-LightdarkBlue text-white font-semibold text-lg rounded-t-lg">
//             Notifications
//           </div>
//           <ul className="max-h-60 overflow-y-auto">
//             {(isLoadingProperties || isLoadingReports) && <p className="p-4">Loading...</p>}
//             {(isErrorProperties || isErrorReports) && <p className="p-4 text-red-500">Error loading notifications</p>}
//             {(!isLoadingProperties && !isLoadingReports && notifications.length === 0) && (
//               <p className="p-4 text-gray-500 text-center">No notifications</p>
//             )}
//             {(!isLoadingProperties && !isLoadingReports && notifications.length > 0) && (
//               notifications.map((item: any) => (
//                 <li
//                   key={item._id}
//                   className="p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
//                   onClick={() => handlePropertyClick(item)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h4 className="font-semibold text-gray-800">{item.address || item.propertyAddress}</h4>
//                     </div>
//                     <span className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
//                       Details
//                     </span>
//                   </div>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}
//       {selectedProperty && (
//         <PropertyDetailsModal property={selectedProperty} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Notification;


import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useGetPendingPropertiesQuery, useGetReportsQuery } from '../../store/propertyApi';
import PropertyDetailsModal from './PropertyDetailsModal';
import ReportDetailsModal from './ReportModal';
import socket from '../../helpers/socket';

const Notification: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const { data: properties = [], isLoading: isLoadingProperties, isError: isErrorProperties, refetch: refetchProperties } = useGetPendingPropertiesQuery();
  const { data: reports = [], isLoading: isLoadingReports, isError: isErrorReports, refetch: refetchReports } = useGetReportsQuery();

  // Effect to handle notifications update
  useEffect(() => {
    setNotifications([...properties, ...reports]);
  }, []);

  // Effect to handle socket events
  useEffect(() => {
    const handleNewReport = (report: any) => {
      console.log('New report received:', report);
      setNotifications(prevNotifications => [report, ...prevNotifications]);
    };

    socket.on('newReport', handleNewReport);

    return () => {
      
      socket.off('newReport', handleNewReport);
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
      // It's a property notification
      return <PropertyDetailsModal property={selectedNotification} onClose={handleCloseModal} />;
    } else {
      // It's a report notification
      return <ReportDetailsModal report={selectedNotification} onClose={handleCloseModal} />;
    }
  };

  return (
    <div className="relative">
      <button onClick={handleDropdownToggle} className="relative focus:outline-none">
        <FaBell className="text-gray-800 text-2xl hover:text-blue-600 transition-colors duration-300" /> 
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="text-center py-2 bg-LightdarkBlue text-white font-semibold text-lg rounded-t-lg">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {(isLoadingProperties || isLoadingReports) && <p className="p-4">Loading...</p>}
            {(isErrorProperties || isErrorReports) && <p className="p-4 text-red-500">Error loading notifications</p>}
            {(!isLoadingProperties && !isLoadingReports && notifications.length === 0) && (
              <p className="p-4 text-gray-500 text-center">No notifications</p>
            )}
            {(!isLoadingProperties && !isLoadingReports && notifications.length > 0) && (
              notifications.map((item: any) => (
                <li
                  key={item._id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleNotificationClick(item)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.address || item.propertyAddress || item.title}</h4>
                    </div>
                    <span className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                      Details
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      {renderModal()}
    </div>
  );
};

export default Notification;
import React from 'react';

const CardSection: React.FC = () => {
  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service1.jpg" alt="Service 1" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p className="text-gray-700">Description of service 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service2.jpg" alt="Service 2" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p className="text-gray-700">Description of service 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/assets/images/service3.jpg" alt="Service 3" className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Service 3</h3>
              <p className="text-gray-700">Description of service 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
// import React, { useEffect, useState } from 'react';
// import useSocket from '../../hooks/useSocket';

// const CardSection: React.FC = () => {
//   const socket = useSocket();
//   const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
//   const [nextId, setNextId] = useState(1);

//   // Function to handle new notifications
//   const handleNewNotification = (notification: { message: string }) => {
//     setNotifications(prevNotifications => [
//       { id: nextId, message: notification.message },
//       ...prevNotifications,
//     ]);
//     setNextId(prevId => prevId + 1);
//   };

//   // Function to dismiss a notification
//   const dismissNotification = (id: number) => {
//     setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
//   };

//   // Set up socket event listeners
//   useEffect(() => {
//     if (!socket) return;

//     socket.on('propertyNotification', handleNewNotification);

//     return () => {
//       socket.off('propertyNotification', handleNewNotification);
//     };
//   }, [socket]);

//   return (
//     <div className="py-8 bg-gray-100">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-semibold">Our Services</h2>
//         </div>

//         <div className="fixed top-4 right-4 z-50">
//           {notifications.map(notification => (
//             <div
//               key={notification.id}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-2 flex items-center justify-between"
//             >
//               <span>{notification.message}</span>
//               <button
//                 className="ml-4 text-white hover:text-gray-300"
//                 onClick={() => dismissNotification(notification.id)}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="/assets/images/service1.jpg" alt="Service 1" className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">Service 1</h3>
//               <p className="text-gray-700">Description of service 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="/assets/images/service2.jpg" alt="Service 2" className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">Service 2</h3>
//               <p className="text-gray-700">Description of service 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="/assets/images/service3.jpg" alt="Service 3" className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">Service 3</h3>
//               <p className="text-gray-700">Description of service 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardSection;
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Adjust this to your backend server URL

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL,{
        reconnectionAttempts: 1,  
        reconnectionDelay: 5000,  
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;

// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3000';

// const useSocket = (onUserStatus: (statusUpdate: { userId: string, status: string }) => void) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(SOCKET_SERVER_URL, {
//       reconnectionAttempts: 1,
//       reconnectionDelay: 5000,
//     });
    
//     setSocket(socketInstance);

//     // Handle user status updates
//     socketInstance.on('userStatus', (statusUpdate) => {
//       onUserStatus(statusUpdate);
//     });

//     return () => {
//       socketInstance.disconnect();
//       socketInstance.off('userStatus');
//     };
//   }, [onUserStatus]);

//   return socket;
// };

// export default useSocket;
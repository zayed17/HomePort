// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'https://cartfurnish.shop/api/chat';

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(SOCKET_SERVER_URL,{
//         reconnectionAttempts: 1,  
//         reconnectionDelay: 5000,  
//     });
//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default useSocket;


// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'wss://cartfurnish.shop'

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     console.log('Attempting to connect to socket...');
//     const socketInstance = io(SOCKET_SERVER_URL, {
//       path: '/api/chat',
//       transports: ['websocket'], 
//     });


//     socketInstance.on('connect', () => {
//       console.log('Connected to the server:', socketInstance.id);
//     });

//     socketInstance.on('connect_error', (error) => {
//       console.error('Connection error:', error.message);
//     });

//     socketInstance.on('disconnect', () => {
//       console.warn('Socket disconnected');
//     });

//     setSocket(socketInstance);

//     return () => {
//       console.log('Disconnecting socket');
//       socketInstance.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default useSocket;


import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'wss://cartfurnish.shop';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('Attempting to connect to socket...');
    
    const socketInstance = io(SOCKET_SERVER_URL, {
      path: '/api/chat',
      transports: ['websocket'],
      reconnectionAttempts: 3, // Maximum number of reconnection attempts
      reconnectionDelay: 3000, // Delay between reconnections (3 seconds)
    });

    socketInstance.on('connect', () => {
      console.log('Connected to the server:', socketInstance.id);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });

    socketInstance.on('disconnect', () => {
      console.warn('Socket disconnected');
    });

    setSocket(socketInstance);

    // Clean up socket on component unmount
    return () => {
      console.log('Disconnecting socket');
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;

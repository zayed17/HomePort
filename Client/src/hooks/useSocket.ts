import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'wss://api.homeport.online';
// const SOCKET_SERVER_URL = 'http://localhost:3000';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('Attempting to connect to socket...');
    
    const socketInstance = io(SOCKET_SERVER_URL, {
      path: '/api/chat/socket.io',  
      transports: ['websocket','polling'],     
      reconnectionAttempts: 3,       
      reconnectionDelay: 3000,      
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
      socketInstance.disconnect()
    };
  }, []);

  return socket;
};

export default useSocket;

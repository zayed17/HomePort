import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5003';

try {

    socket = io(SOCKET_SERVER_URL, {
        path: '/api/property/socket.io',  
        transports: ['websocket','polling'],     
        reconnectionAttempts: 3,       
        reconnectionDelay: 3000,
    });

    
    socket.on('connect', () => {
        console.log('Connected to the server:', socket?.id);
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
    });

    socket.on('newReport', (report: any) => {
        console.log('New report received:', report);
    });

    socket.on('disconnect', () => {
        console.warn('Disconnected from the server');
    });

} catch (error) {
    console.error('Failed to connect to Socket.IO server:', (error as Error).message);
}

export default socket;
import { io } from 'socket.io-client';

const socket = io('http://localhost:5003',{
    withCredentials: true,
}); 

socket.on('connect', () => {
    console.log('Connected to the server:', socket.id);
});

socket.on('newReport', (report : any) => {
    console.log('New report received:', report);
});

export default socket;
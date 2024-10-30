import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import chatRoutes, { messageController } from './adapters/route/route';
import dotenv from 'dotenv';
import connectDB from './infrastruture/mongodb/connection/connection';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  path: '/api/chat/socket.io',
  transports: ['websocket', 'polling'], 
  cors: {
    origin: 'https://homeport.online',
    // origin:["http://localhost:5173" , "http://localhost:5003"],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://homeport.online',
  // origin:["http://localhost:5173"],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  
  socket.broadcast.emit('userStatus', { userId: socket.id, status: 'online' });

  messageController.handleSocketEvents(socket, io);
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/api/chat', chatRoutes);

const startServer = async () => {
  await connectDB();
  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });  
};

startServer();
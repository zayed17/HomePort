import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';  // Import the cors package
import chatRoutes from './chatRoute';
import Message from './messageSchema';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',  // Replace with the origin you want to allow
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with the origin you want to allow
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));
app.use('/api', chatRoutes);

// Socket.IO setup
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Join a chat room
  socket.on('joinRoom', (chatId: string) => {
    socket.join(chatId);
  });

  // Handle sending messages
  socket.on('sendMessage', async (messageData: {
    chatId: string;
    senderId: string;
    message: string;
  }) => {
    console.log(messageData)
    const { chatId, senderId, message } = messageData;

    if (!chatId) {
      console.error('chatId is required');
      return; 
    }

    try {
      // Save message to database
      const newMessage = new Message({ chatId, senderId, message });
      await newMessage.save();

      // Emit message to room
      io.to(chatId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://mzayed9745:mohammadzayed9745@projectcluster.dozic4b.mongodb.net/Chat?retryWrites=true&w=majority&appName=ProjectCluster').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import chatRoutes from './chatRoute';
import Message from './messageSchema';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use('/chat', chatRoutes);

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.broadcast.emit('userStatus', { userId: socket.id, status: 'online' });

  socket.on('joinRoom', (chatId: string) => {
    socket.join(chatId);
  });

  socket.on('sendMessage', async (messageData: {
    chatId: string;
    senderId: string;
    message?: string;
    photoUrl?: string; 
  }) => {
    const { chatId, senderId, message, photoUrl } = messageData;
console.log(messageData,"checking")
    if (!chatId) {
      console.error('chatId is required');
      return;
    }

    try {
      const newMessage = new Message({
        chatId,
        senderId,
        message,
        photoUrl,
      });

      await newMessage.save();
      io.to(chatId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('addReaction', async (data: {
    messageId: string;
    reactionType: string;
    userId: string;
    chatId: string;
  }) => {
    const { messageId, reactionType, userId, chatId } = data;

    try {
      const message = await Message.findById(messageId);
      if (message) {
        const existingReaction = message.reactions.find(
          (reaction) => reaction.userId === userId
        );

        if (existingReaction) {
          existingReaction.type = reactionType;
        } else {
          message.reactions.push({ type: reactionType, userId });
        }

        await message.save();
        io.to(chatId).emit('receiveReaction', {
          messageId,
          reaction: { type: reactionType, userId },
        });
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


mongoose.connect('mongodb+srv://mzayed9745:mohammadzayed9745@projectcluster.dozic4b.mongodb.net/Chat?retryWrites=true&w=majority&appName=ProjectCluster').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
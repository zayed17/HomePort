import express, { Request, Response } from 'express';
import Chat from './chatSchema';

const router = express.Router();

const sortParticipants = (participants: { userId: string; name: string; photo: string }[]) => {
  return participants.sort((a, b) => a.userId.localeCompare(b.userId));
};

// Route to create or join a chat
router.post('/chats', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { participants } = req.body;

    // Sort participants for consistency
    const sortedParticipants = sortParticipants(participants);

    // Check if a chat with these participants already exists
    const existingChat = await Chat.findOne({
      'participants.userId': { $all: sortedParticipants.map(p => p.userId) },
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    // Create a new chat room
    const newChat = new Chat({ participants: sortedParticipants });
    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    console.error('Error creating or joining chat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
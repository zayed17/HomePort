// import express, { Request, Response } from 'express';
// import Chat from './chatSchema';
// import Message from './messageSchema';
// import { authenticateToken } from 'homepackage'

// const router = express.Router();

// const sortParticipants = (participants: { userId: string; name: string; photo: string }[]) => {
//   return participants.sort((a, b) => a.userId.localeCompare(b.userId));
// };
// router.get('/:chatId/messages', async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// // Example using Express.js
// router.get('/chats', authenticateToken(['user']), async (req:any, res) => {
//   const userId = req.user._id;
// console.log(userId,"checking")
//   try {
//     const chats = await Chat.find({ 'participants.userId': userId }).populate('participants.userId');
//     console.log(chats)
//     res.json(chats);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch chats' });
//   }
// });

// router.post('/chats', async (req: Request, res: Response) => {
//   try {
//     console.log(req.body)
//     const { participants } = req.body;

//     const sortedParticipants = sortParticipants(participants);

//     const existingChat = await Chat.findOne({
//       'participants.userId': { $all: sortedParticipants.map(p => p.userId) },
//     });

//     if (existingChat) {
//       return res.json(existingChat);
//     }

//     const newChat = new Chat({ participants: sortedParticipants });
//     await newChat.save();

//     res.status(201).json(newChat);
//   } catch (error) {
//     console.error('Error creating or joining chat:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// export default router;



import express, { Request, Response } from 'express';
import Chat from './chatSchema';
import Message from './messageSchema';
import { authenticateToken } from 'homepackage';
import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';


const router = express.Router();

const sortParticipants = (participants: { userId: string; name: string; photo: string }[]) => {
  return participants.sort((a, b) => a.userId.localeCompare(b.userId));
};

router.get('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    console.log(messages,"checking")
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.get('/chats', authenticateToken(['user']), async (req: any, res: Response) => {
  const userId = req.user._id;
  try {
    const chats = await Chat.find({ 'participants.userId': userId }).populate('participants.userId');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

router.post('/chats', async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const sortedParticipants = sortParticipants(participants);

    const existingChat = await Chat.findOne({
      'participants.userId': { $all: sortedParticipants.map(p => p.userId) },
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    const newChat = new Chat({ participants: sortedParticipants });
    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    console.error('Error creating or joining chat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

// Multer setup for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});


router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${Date.now()}_${path.basename(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.json({ url: data.Location });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

export default router;
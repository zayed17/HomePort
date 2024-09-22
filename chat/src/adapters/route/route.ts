import { Router } from "express";
import { ChatController } from "../controller/Controller";
import { ChatUseCase,CreateOrFindChatUseCase,GetMessageUseCase,UploadFileUseCase,AddReactionUseCase,SendMessageUseCase,PropertyNotificationUseCase} from '../../usecase';
import { ChatRepository,MessageRepository,UploadFileRepository} from '../../repositories/implementation';
import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});
import { authenticateToken } from 'homepackage'
import { MessageController } from "../controller/MessageController";

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const uploadFileRepository = new UploadFileRepository()


const chatUseCase = new ChatUseCase(chatRepository)
const createOrFindChatUseCase = new CreateOrFindChatUseCase(chatRepository)
const getMessageUseCase = new GetMessageUseCase(messageRepository);
const uploadFileUseCase = new UploadFileUseCase(uploadFileRepository);
const addReactionUseCase = new AddReactionUseCase(messageRepository)
const sendMessageUseCase = new SendMessageUseCase(messageRepository)
const propertyNotificationUseCase = new PropertyNotificationUseCase()

export const messageController = new MessageController(
  addReactionUseCase,
  sendMessageUseCase,
  propertyNotificationUseCase
);


const chatController = new ChatController(
    getMessageUseCase,
    chatUseCase,
    createOrFindChatUseCase,
    uploadFileUseCase
  );
const router = Router();
router.get('/:chatId/messages',  (req, res, next) => chatController.getMessages(req, res, next));
router.get('/chats',authenticateToken(['user']),  (req, res, next) => chatController.getChats(req, res, next));
router.post('/chats', (req, res, next) => chatController.createOrJoinChat(req, res, next));
router.post('/upload', upload.single('file'), (req, res, next) => chatController.uploadFile(req, res, next));

export default router;    
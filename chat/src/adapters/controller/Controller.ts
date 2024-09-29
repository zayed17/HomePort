import { Request, Response, NextFunction } from 'express';
import { GetMessageUseCase, ChatUseCase, CreateOrFindChatUseCase, UploadFileUseCase } from '../../usecase';

export class ChatController {
    constructor(private getMessageUseCase: GetMessageUseCase,
        private chatUseCase: ChatUseCase,
        private createOrFindChatUseCase: CreateOrFindChatUseCase,
        private uploadFileUseCase: UploadFileUseCase

    ) { }

    async getMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { chatId } = req.params;
            const messages = await this.getMessageUseCase.getMessage(chatId);
            res.json(messages);
        } catch (error) {
            next(error);
        }
    }

    async getChats(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user._id;
            const chats = await this.chatUseCase.getChats(userId);
            res.json(chats);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    async createOrJoinChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { participants } = req.body;
            const chat = await this.createOrFindChatUseCase.execute(participants);
            res.status(201).json(chat);
        } catch (error) {
            next(error);
        }
    }

    async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return
            }
            const fileData = await this.uploadFileUseCase.fileUpload(req.file.buffer,
                req.file.originalname,
                req.file.mimetype
            );
            res.json({ url: fileData.url });
        } catch (error) {
            next(error);
        }
    }
}
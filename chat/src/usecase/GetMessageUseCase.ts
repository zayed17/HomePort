import { MessageInterface } from '../repositories/interface';
import { MessageData } from '../entities/messageEntity';

export class GetMessageUseCase {
    constructor(private messageRepository: MessageInterface) { }
    async getMessage(chatId:string): Promise<MessageData[]> {
        const messages = await this.messageRepository.findMessagesByChatId(chatId);
        return messages
    }
}
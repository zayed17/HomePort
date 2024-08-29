import { MessageData } from '../../entities/messageEntity'

export interface MessageInterface {
    saveMessage(message: MessageData): Promise<MessageData>;
    findMessagesByChatId(chatId: string): Promise<MessageData[]>;
    findMessageById(messageId: string): Promise<MessageData | null>;
}
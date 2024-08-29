import { ChatData } from '../../entities/chatEntity';

export interface ChatInterface {
    findChatByParticipants(participants: string[]): Promise<ChatData | null>;
    findChatsByUserId(userId: string): Promise<ChatData[]>;
    createChat(chatData: ChatData): Promise<ChatData>;
}
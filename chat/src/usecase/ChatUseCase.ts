import { ChatInterface } from '../repositories/interface';

export class ChatUseCase {
    constructor(private chatRepository: ChatInterface) { }
    async getChats(userId:string): Promise<any[]> {
        const chats = await this.chatRepository.findChatsByUserId(userId);
        return chats
    }
}
import { ChatInterface } from '../interface';
import Chat from '../../infrastruture/mongodb/schema/chatSchema'; 
import { ChatData } from '../../entities/chatEntity';

export class ChatRepository implements ChatInterface {
  async findChatsByUserId(userId: string): Promise<any[]> {
    const chats = await Chat.find({ 'participants.userId': userId }).populate('participants.userId').exec();
    return chats
  }

  async findChatByParticipants(participants: string[]): Promise<ChatData | null> {
    const chat = await Chat.findOne({
      'participants.userId': { $all: participants },
    }).exec();
    return chat ? chat.toObject() : null;
  }

  async createChat(chatData: ChatData): Promise<ChatData> {
    const newChat = new Chat(chatData);
    await newChat.save();
    return newChat.toObject();
  }
}
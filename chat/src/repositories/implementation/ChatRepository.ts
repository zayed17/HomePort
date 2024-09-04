import { ChatInterface } from '../interface';
import Chat from '../../infrastruture/mongodb/schema/chatSchema'; 
import { ChatData } from '../../entities/chatEntity';

const toChatData = (doc: any): ChatData => ({
  ...doc.toObject(),
  _id: doc._id.toString(), 
});

export class ChatRepository implements ChatInterface {
  async findChatsByUserId(userId: string): Promise<ChatData[]> {
    const chats = await Chat.find({ 'participants.userId': userId }).populate('participants.userId').exec();
    return chats.map(toChatData); 
  }

  async findChatByParticipants(participants: string[]): Promise<ChatData | null> {
    const chat = await Chat.findOne({
      'participants.userId': { $all: participants },
    }).exec();
    return chat ? toChatData(chat) : null; 
  }

  async createChat(chatData: ChatData): Promise<ChatData> {
    const newChat = new Chat(chatData);
    await newChat.save();
    return toChatData(newChat);
  }
}
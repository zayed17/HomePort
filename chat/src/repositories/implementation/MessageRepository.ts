import { MessageInterface } from '../interface/MessageInterface';
import Message from '../../infrastruture/mongodb/schema/messageSchema';
import {MessageData} from '../../entities/messageEntity'


export class MessageRepository implements MessageInterface {
  async findMessagesByChatId(chatId: string): Promise<MessageData[]> {
    return Message.find({ chatId }).sort({ timestamp: 1 }).exec();
  }
  async saveMessage(message: MessageData): Promise<MessageData> {
    const newMessage = new Message(message);
    await newMessage.save();
    return newMessage
  }
  async findMessageById(messageId: string): Promise<MessageData | null> {
    return await Message.findById(messageId).exec();
  }

}
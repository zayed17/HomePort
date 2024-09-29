import { MessageInterface } from '../interface/MessageInterface';
import Message from '../../infrastruture/mongodb/schema/messageSchema';
import { MessageData } from '../../entities/messageEntity';

const toMessageData = (doc: any): MessageData => ({
  ...doc.toObject(),
  _id: doc._id.toString(), 
});

export class MessageRepository implements MessageInterface {
  async findMessagesByChatId(chatId: string): Promise<MessageData[]> {
    const docs = await Message.find({ chatId }).sort({ timestamp: 1 }).exec();
    return docs.map(toMessageData);
  }

  async saveMessage(message: MessageData): Promise<any> {
    const newMessage = new Message(message);
    await newMessage.save();
    return newMessage
  }

  async updateMessage(message: MessageData): Promise<MessageData> {
    console.log(message,"messga consolinon")
    const updatedMessage = await Message.findByIdAndUpdate(
      message._id, 
      { reactions: message.reactions },
      { new: true } 
    ).exec();

    return toMessageData(updatedMessage);
  }
  
  

  async findMessageById(messageId: string): Promise<MessageData | null> {
    const doc = await Message.findById(messageId).exec();
    return doc ? toMessageData(doc) : null;
  }
}
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

  async saveMessage(message: MessageData): Promise<MessageData> {
    const updatedMessage = await Message.findByIdAndUpdate(
      message._id,            // Find by the message ID
      { reactions: message.reactions },  // Update the reactions field
      { new: true }           // Return the updated document
    ).exec();
  
    if (!updatedMessage) {
      throw new Error('Message not found for update');
    }
  
    return toMessageData(updatedMessage);
  }
  
  

  async findMessageById(messageId: string): Promise<MessageData | null> {
    const doc = await Message.findById(messageId).exec();
    return doc ? toMessageData(doc) : null;
  }
}
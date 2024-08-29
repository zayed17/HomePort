import { MessageInterface } from '../repositories/interface';

export class SendMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(messageData: {
    chatId: string;
    senderId: string;
    message?: string;
    photoUrl?: string;
  }): Promise<any> {
    const newMessage = {
      chatId: messageData.chatId,
      senderId: messageData.senderId,
      message: messageData.message,
      photoUrl: messageData.photoUrl,
      reactions: [] 
    };
    console.log(newMessage,"chekcing")
   const num =  await this.messageRepository.saveMessage(newMessage);
    return num
  }
}
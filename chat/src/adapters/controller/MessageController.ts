import { Socket } from 'socket.io';
import { AddReactionUseCase, SendMessageUseCase, PropertyNotificationUseCase } from '../../usecase';
import { Server as SocketIOServer } from 'socket.io';

export class MessageController {
  constructor(
    private addReactionUseCase: AddReactionUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private propertyNotificationUseCase: PropertyNotificationUseCase
  ) {}

  public handleSocketEvents(socket: Socket, io: SocketIOServer): void {
    socket.on('joinRoom', (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on('sendMessage', async (messageData: {
      chatId: string;
      senderId: string;
      message?: string;
      photoUrl?: string;
    }) => {
      try {
       const newMessage = await this.sendMessageUseCase.execute(messageData);
        io.to(messageData.chatId).emit('receiveMessage', newMessage);
      } catch (error) {
        console.error("Error in sendMessage handler:", error);
      }
    });

    socket.on('addReaction', async (data: {
      messageId: string;
      reactionType: string;
      userId: string;
      chatId: string;
    }) => {
      try {
        await this.addReactionUseCase.execute(data.messageId, {
          type: data.reactionType,
          userId: data.userId,
        });

        io.to(data.chatId).emit('receiveReaction', {
          messageId: data.messageId,
          reaction: { type: data.reactionType, userId: data.userId },
        });
      } catch (error) {
        console.error('Error handling addReaction:', error);
      }
    });

    socket.on('adminBlocked', () => {
      console.log('User blocking');
      io.emit('adminBlocked');
    });

    socket.on('propertyBooked', async (bookingData) => {
      try {
        const notification = this.propertyNotificationUseCase.createBookingNotification(bookingData);
        io.emit('propertyNotification', notification);
      } catch (error) {
        console.error('Error handling propertyBooked:', error);
      }
    });

    socket.on('propertyRejected', async (rejectionData) => {
      try {
        const notification = this.propertyNotificationUseCase.createRejectionNotification(rejectionData);
        io.emit('propertyNotification', notification);
      } catch (error) {
        console.error('Error handling propertyRejected:', error);
      }
    });

    socket.on('propertyVerified', async () => {
      try {
        const notification = this.propertyNotificationUseCase.createVerificationNotification();
        io.emit('propertyNotification', notification);
      } catch (error) {
        console.error('Error handling propertyVerified:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  }
}
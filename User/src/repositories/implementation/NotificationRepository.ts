import { NotificationInterface } from '../interface';
import { io } from 'socket.io-client';

export class NotificationRepository implements NotificationInterface {
  private socket;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
  }

  async sendNotification(eventName: string, data: Record<string, any>): Promise<void> {
    this.socket.emit(eventName, data);
  }
}
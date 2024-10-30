import { NotificationInterface } from '../interface';
import { io } from 'socket.io-client';

export class NotificationRepository implements NotificationInterface {
  private socket;

  constructor(serverUrl: string) {
    console.log(serverUrl,"cheicndkfndknfdkn")
    this.socket = io(serverUrl);
  }

  async sendNotification(eventName: string, data: Record<string, any>): Promise<void> {
    console.log(eventName,data,"chdk")
    this.socket.emit(eventName, data);
  }
}
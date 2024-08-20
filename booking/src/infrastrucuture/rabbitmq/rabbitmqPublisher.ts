import amqp from 'amqplib';
import { RABBITMQ_CONFIG } from '../../config/rabbitmqconfig';

export class RabbitMQPublisher {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      this.connection = await amqp.connect(RABBITMQ_CONFIG.url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(RABBITMQ_CONFIG.exchanges.bookingExchange, 'direct');
      await this.channel.assertQueue(RABBITMQ_CONFIG.queues.bookingsQueue);
      await this.channel.bindQueue(
        RABBITMQ_CONFIG.queues.bookingsQueue,
        RABBITMQ_CONFIG.exchanges.bookingExchange,
        RABBITMQ_CONFIG.routingKeys.bookingKey
      );
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
    }
  }

  public async publishBookingData(propertyId: string, userId: string, bookingDate: Date, name: string) {
    if (!this.channel) throw new Error('Channel is not initialized');
    
    const message = JSON.stringify({ propertyId, userId, bookingDate, name });
    try {
       this.channel.publish(
        RABBITMQ_CONFIG.exchanges.bookingExchange,
        RABBITMQ_CONFIG.routingKeys.bookingKey,
        Buffer.from(message)
      );
      console.log('Booking data sent to RabbitMQ:', message);
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }

  public async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}
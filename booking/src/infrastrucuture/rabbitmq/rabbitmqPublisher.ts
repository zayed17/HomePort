import amqp from 'amqplib';
import { RABBITMQ_CONFIG } from '../../config/rabbitmqconfig';

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000; 

export class RabbitMQPublisher {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor() {
    this.init();
  }

  private async init(retryCount: number = 0): Promise<void> {
    try {
      console.log('Attempting to connect to RabbitMQ...');
      this.connection = await amqp.connect(RABBITMQ_CONFIG.url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(RABBITMQ_CONFIG.exchanges.bookingExchange, 'direct');
      await this.channel.assertQueue(RABBITMQ_CONFIG.queues.bookingsQueue);
      await this.channel.bindQueue(
        RABBITMQ_CONFIG.queues.bookingsQueue,
        RABBITMQ_CONFIG.exchanges.bookingExchange,
        RABBITMQ_CONFIG.routingKeys.bookingKey
      );
      console.log('Connected and setup RabbitMQ successfully.');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      if (retryCount < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, retryCount); 
        console.log(`Retrying in ${delay} ms...`);
        setTimeout(() => this.init(retryCount + 1), delay);
      } else {
        console.error('Max retries reached. Could not connect to RabbitMQ.');
        process.exit(1);
      }
    }
  }

  private async publishMessage(data: object, retryCount: number = 0) {
    if (!this.channel) throw new Error('Channel is not initialized');
    try {
      const message = JSON.stringify(data);
      this.channel.publish(
        RABBITMQ_CONFIG.exchanges.bookingExchange,
        RABBITMQ_CONFIG.routingKeys.bookingKey,
        Buffer.from(message)
      );
      console.log('Message sent to RabbitMQ:', message);
    } catch (error) {
      console.error('Failed to publish message:', error);
      if (retryCount < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, retryCount); 
        console.log(`Retrying to publish message in ${delay} ms...`);
        setTimeout(() => this.publishMessage(data, retryCount + 1), delay);
      } else {
        console.error('Max retries reached. Could not publish message.');
      }
    }
  }

  public async publishBookingData(propertyId: string, userId: string, bookingDate: Date, name: string, amountPaid: number, bookingId: string) {
    const data = { propertyId, userId, bookingDate, name, amountPaid, bookingId };
    await this.publishMessage(data);
  }

  public async publishBookedData(propertyId: string, status: string, bookedId: string) {
    const data = { propertyId, status, bookedId };
    await this.publishMessage(data);
  }

  public async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}
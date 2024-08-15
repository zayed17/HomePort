import amqp from 'amqplib';
import { RabbitMQPublisherInterface } from '../../repositories';

export class RabbitMQPublisher implements RabbitMQPublisherInterface {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
  private exchange = 'user_updates'; // Default exchange, can be changed as needed

  constructor(private url: string) {
    this.initialize(); // Initialize connection and channel upon instantiation
  }

  // Initialize connection and channel
  private async initialize(): Promise<void> {
    try {
      console.log(this.url, "Connecting to RabbitMQ...");
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
      console.log('RabbitMQ connection and channel initialized.');
    } catch (error) {
      console.error('Failed to initialize RabbitMQ connection:', error);
      throw error;
    }
  }

  // Publish a message to the exchange
  public async publish(exchange: string = this.exchange, routingKey: string, message: any): Promise<void> {
    try {
      const payload = Buffer.from(JSON.stringify(message));
      console.log('Publishing message:', exchange, routingKey, message);
      this.channel.publish(exchange, routingKey, payload);
      console.log('Message published successfully.');
    } catch (error) {
      console.error('Failed to publish message:', error);
      throw error;
    }
  }
}
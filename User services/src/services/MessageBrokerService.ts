import amqp from 'amqplib';
import { createConnection, createChannel } from '../infrastructure/rabbitMq/amqp';

export class MessageBrokerService {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;
    private exchange = 'user_updates';

    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.connection = await createConnection();
        this.channel = await createChannel(this.connection);
        await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
    }

    public async publishUserUpdate(userId: string, data: any) {
        const message = JSON.stringify({ userId, ...data });
        this.channel.publish(this.exchange, 'update', Buffer.from(message));
        console.log('Message sent:', message);
    }
}
import { RabbitMQClient } from './RabbitMQClient';
import { rabbitmqConfig } from '../../config/rabbitmqConfig';
import { UpdateUserSubscriptionUsecase } from '../../usecases';
import amqp from 'amqplib';

export class RabbitMQConsumer {
    private client: RabbitMQClient;
    private updateUserSubscriptionUsecase: UpdateUserSubscriptionUsecase;

    // Configure retry parameters
    private readonly maxRetries: number = 5;
    private readonly retryDelay: number = 3000; // in milliseconds

    constructor(client: RabbitMQClient, updateUserSubscriptionUsecase: UpdateUserSubscriptionUsecase) {
        this.client = client;
        this.updateUserSubscriptionUsecase = updateUserSubscriptionUsecase;
    }

    async start(): Promise<void> {
        await this.client.connect(rabbitmqConfig.url);
        const channel = await this.client.getChannel();

        await channel.assertExchange(rabbitmqConfig.exchange, 'topic', { durable: true });
        await channel.assertQueue(rabbitmqConfig.queues.updateUser, { durable: true });
        await channel.bindQueue(rabbitmqConfig.queues.updateUser, rabbitmqConfig.exchange, 'update');

        channel.consume(rabbitmqConfig.queues.updateUser, async (msg) => {
            if (msg) {
                const messageContent = JSON.parse(msg.content.toString());
                await this.handleUserUpdate(messageContent, msg);
            }
        }, { noAck: false }); // Disable auto-acknowledgement
    }

    private async handleUserUpdate(message: any, originalMessage: amqp.Message): Promise<void> {
        console.log(message, 'Received message for user update');
        let attempt = 0;
        while (attempt < this.maxRetries) {
            try {
                const { id, count, change } = message;
                await this.updateUserSubscriptionUsecase.update(id, count, change);
                console.log(`User ${id} updated with new count ${count}`);
                // Acknowledge the message after successful processing
                this.client.getChannel().then(channel => channel.ack(originalMessage));
                return; // Exit the loop if successful
            } catch (error) {
                attempt++;
                console.error(`Attempt ${attempt} failed for user update:`, error);
                if (attempt >= this.maxRetries) {
                    // Optionally, you can move the message to a dead-letter queue or handle it differently
                    console.error('Max retry attempts reached. Failed to update user:', message);
                    // Acknowledge the message to prevent reprocessing if necessary
                    this.client.getChannel().then(channel => channel.ack(originalMessage));
                }
                await this.delay(this.retryDelay);
            }
        }
    }

    // Utility function for delay
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
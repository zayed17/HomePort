import { RabbitMQClient } from './RabbitMQClient';
import { rabbitmqConfig } from '../../config/rabbitmqConfig';
import { UpdateUserSubscriptionUsecase } from '../../usecases/';

export class RabbitMQConsumer {
    private client: RabbitMQClient;
    private updateUserSubscriptionUsecase: UpdateUserSubscriptionUsecase;

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
                await this.handleUserUpdate(messageContent);
            }
        }, { noAck: true });
    }

    private async handleUserUpdate(message: any): Promise<void> {
        console.log(message,'sfnsdkfsdkfnksdl')
        try {
            const { id, count,change} = message;
            await this.updateUserSubscriptionUsecase.update(id, count,change);
            console.log(`User ${id} updated with new count ${count}`);
        } catch (error) {
            console.error('Error handling user update:', error);
        }
    }
}
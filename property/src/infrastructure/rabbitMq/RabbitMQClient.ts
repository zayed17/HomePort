// import amqp from 'amqplib';

// export class RabbitMQClient {
//     private connection!: amqp.Connection;
//     private channel!: amqp.Channel;

//     async connect(url: string): Promise<void> {
//         this.connection = await amqp.connect(url);
//         this.channel = await this.connection.createChannel();
//     }

//     async consume(queue: string, onMessage: (msg: amqp.Message | null) => void): Promise<void> {
//         await this.channel.assertQueue(queue);
//         this.channel.consume(queue, onMessage, { noAck: true });
//     }
// }

import amqp from 'amqplib';

export class RabbitMQClient {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    async connect(url: string): Promise<void> {
        this.connection = await amqp.connect(url);
        this.channel = await this.connection.createChannel();
    }

    async getChannel(): Promise<amqp.Channel> {
        if (!this.channel) {
            throw new Error("Channel is not initialized");
        }
        return this.channel;
    }

    async consume(queue: string, onMessage: (msg: amqp.Message | null) => void): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, onMessage, { noAck: true });
    }
}
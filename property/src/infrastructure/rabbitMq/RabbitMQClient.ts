// import amqp from 'amqplib';

// export class RabbitMQClient {
//     private connection!: amqp.Connection;
//     private channel!: amqp.Channel;

//     async connect(url: string): Promise<void> {
//         this.connection = await amqp.connect(url);
//         this.channel = await this.connection.createChannel();
//     }

//     async getChannel(): Promise<amqp.Channel> {
//         if (!this.channel) {
//             throw new Error("Channel is not initialized");
//         }
//         return this.channel;
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

    async assertExchange(exchange: string, type: string, options?: amqp.Options.AssertExchange): Promise<void> {
        await this.channel.assertExchange(exchange, type, options);
    }

    async assertQueue(queue: string, options?: amqp.Options.AssertQueue): Promise<void> {
        await this.channel.assertQueue(queue, options);
    }

    async bindQueue(queue: string, exchange: string, routingKey: string): Promise<void> {
        await this.channel.bindQueue(queue, exchange, routingKey);
    }

    async consume(queue: string, onMessage: (msg: amqp.Message | null) => void): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, onMessage, { noAck: true });
    }

    async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }
}
// import { RabbitMQClient } from "./RabbitMQClient";
// import { UpdateUserPropertyListener } from "../../adpaters/messaging/UserPropertyListener";
// import { rabbitmqConfig } from "../../config/rabbitmqConfig";

// export class RabbitMQConsumer {
//     constructor(private  client: RabbitMQClient, private  listener: UpdateUserPropertyListener) {}

//     async start(): Promise<void> {
//         await this.client.connect(rabbitmqConfig.url);
//         await this.client.consume(rabbitmqConfig.queues.updateUser, this.listener.handle.bind(this.listener));
//     }
// }

import { RabbitMQClient } from "./RabbitMQClient";
import { UpdateUserPropertyListener } from"../../adpaters/messaging/UserPropertyListener";
import { rabbitmqConfig } from "../../config/rabbitmqConfig";

export class RabbitMQConsumer {
    constructor(private client: RabbitMQClient, private listener: UpdateUserPropertyListener) {}

    async start(): Promise<void> {
        await this.client.connect(rabbitmqConfig.url);
        const channel = await this.client.getChannel();

        // Ensure exchange and queue are declared, and queue is bound to the exchange
        await channel.assertExchange(rabbitmqConfig.exchange, 'topic', { durable: true });
        await channel.assertQueue(rabbitmqConfig.queues.updateUser, { durable: true });
        await channel.bindQueue(rabbitmqConfig.queues.updateUser, rabbitmqConfig.exchange, 'update');

        // Start consuming messages from the queue
        channel.consume(rabbitmqConfig.queues.updateUser, async (msg) => {
            if (msg) {
                await this.listener.handle(msg);
            }
        }, { noAck: true });

    }
}
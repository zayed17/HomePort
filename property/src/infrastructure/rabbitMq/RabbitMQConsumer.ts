import { RabbitMQClient } from "./RabbitMQClient";
import { UpdateUserPropertyListener } from"../../adpaters/messaging/UserPropertyListener";
import { rabbitmqConfig } from "../../config/rabbitmqConfig";
import { BookingUpdateListener } from "../../adpaters/messaging/BookingUpdateListener";

export class RabbitMQConsumer {
    constructor(private client: RabbitMQClient, private listener: UpdateUserPropertyListener,private bookingListener:BookingUpdateListener) {}

    // async start(): Promise<void> {
    //     await this.client.connect(rabbitmqConfig.url);
    //     const channel = await this.client.getChannel();

    //     await channel.assertExchange(rabbitmqConfig.exchange, 'topic', { durable: true });
    //     await channel.assertQueue(rabbitmqConfig.queues.updateUser, { durable: true });
    //     await channel.bindQueue(rabbitmqConfig.queues.updateUser, rabbitmqConfig.exchange, 'update');

    //     channel.consume(rabbitmqConfig.queues.updateUser, async (msg) => {
    //         if (msg) {
    //             await this.listener.handle(msg);
    //         }
    //     }, { noAck: true });

    // }

    async start(): Promise<void> {
        await this.client.connect(rabbitmqConfig.url);
        const channel = await this.client.getChannel();

        await channel.assertExchange(rabbitmqConfig.exchanges.userUpdates, 'topic', { durable: true });
        await channel.assertQueue(rabbitmqConfig.queues.updateUser, { durable: true });
        await channel.bindQueue(rabbitmqConfig.queues.updateUser, rabbitmqConfig.exchanges.userUpdates, rabbitmqConfig.routingKeys.userUpdateKey);

        channel.consume(rabbitmqConfig.queues.updateUser, async (msg) => {
            if (msg) {
                await this.listener.handle(msg);
            }
        }, { noAck: true });




        await channel.assertExchange(rabbitmqConfig.exchanges.bookingUpdates, 'direct', { durable: true });
        await channel.assertQueue(rabbitmqConfig.queues.bookings, { durable: true });
        await channel.bindQueue(rabbitmqConfig.queues.bookings, rabbitmqConfig.exchanges.bookingUpdates, rabbitmqConfig.routingKeys.bookingKey);

        channel.consume(rabbitmqConfig.queues.bookings, async (msg) => {
            console.log(msg,"checking of booking")
            if (msg) {
                await this.bookingListener.handle(msg);
            }
        }, { noAck: true });
    }

}
export const rabbitmqConfig = {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    exchange: 'user_updates',
    queues: {
        updateUser: 'user_updates_queue',
    }
};
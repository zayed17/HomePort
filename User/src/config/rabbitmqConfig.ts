export const rabbitmqConfig = {
    url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
    // url: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    exchange: 'user_updates',
    queues: {
        updateUser: 'user_updates_queue',
    }
};
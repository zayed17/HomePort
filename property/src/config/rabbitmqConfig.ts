// export const rabbitmqConfig = {
//     url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
//     exchange: 'user_updates', 
//     queues: {
//         updateUser: 'user_updates_queue', 
//     }
// };

export const rabbitmqConfig = {
    url: "amqp://rabbitmq:5672",

    // Exchange and queue configuration for user updates
    exchanges: {
        userUpdates: 'user_updates',
        bookingUpdates: 'booking_exchange' 
    },

    queues: {
        updateUser: 'user_updates_queue',
        bookings: 'bookings_queue' // New queue for booking updates
    },

    routingKeys: {
        userUpdateKey: 'update',
        bookingKey: 'booking_key' // New routing key for booking updates
    }
};
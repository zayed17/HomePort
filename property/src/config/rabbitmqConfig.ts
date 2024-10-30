export const rabbitmqConfig = {
    url: "amqp://rabbitmq:5672",
    // url:"amqp://guest:guest@localhost:5672",

    exchanges: {
        userUpdates: 'user_updates',
        bookingUpdates: 'booking_exchange' 
    },

    queues: {
        updateUser: 'user_updates_queue',
        bookings: 'bookings_queue' 
    },

    routingKeys: {
        userUpdateKey: 'update',
        bookingKey: 'booking_key' 
    }
};
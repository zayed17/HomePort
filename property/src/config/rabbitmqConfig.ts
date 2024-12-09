export const rabbitmqConfig = {

    url: process.env.RABBITMQ_URL || "", 
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
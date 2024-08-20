export const RABBITMQ_CONFIG = {
    url: 'amqp://localhost',
    exchanges: {
      bookingExchange: 'booking_exchange',
    },
    queues: {
      bookingsQueue: 'bookings_queue',
    },
    routingKeys: {
      bookingKey: 'booking_key',
    },
  };
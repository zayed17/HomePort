export const RABBITMQ_CONFIG = {
  url: 'amqp://rabbitmq:5672',
  // url: 'amqp://localhost:5672',

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
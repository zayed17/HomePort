export const RABBITMQ_CONFIG = {
  url: process.env.RABBITMQ_URL || "",
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
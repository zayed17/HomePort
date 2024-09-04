import amqp from 'amqplib';

export async function createConnection() {
    return amqp.connect('amqp://rabbitmq:5672');
}

export async function createChannel(connection: amqp.Connection) {
    return connection.createChannel();
}
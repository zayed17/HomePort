import amqp from 'amqplib';

export async function createConnection() {
    return amqp.connect('amqp://localhost');
}

export async function createChannel(connection: amqp.Connection) {
    return connection.createChannel();
}
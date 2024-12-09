import amqp from 'amqplib';
const rabbitmqUrl = process.env.RABBITMQ_URL || '';

export async function createConnection() {
    return amqp.connect(rabbitmqUrl);
}

export async function createChannel(connection: amqp.Connection) {
    return connection.createChannel();
}
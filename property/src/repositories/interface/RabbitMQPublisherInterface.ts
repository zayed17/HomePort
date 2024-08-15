export interface RabbitMQPublisherInterface {
    publish(exchange: string, routingKey: string, message: any): Promise<void>;
  }
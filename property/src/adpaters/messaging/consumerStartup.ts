import { RabbitMQClient } from "../../infrastructure/rabbitMq/RabbitMQClient";
import { RabbitMQConsumer } from "../../infrastructure/rabbitMq/RabbitMQConsumer";
import { UpdateUserDetailsUseCase } from "../../usecase";
import { UpdateUserPropertyListener } from "./UserPropertyListener";
import { UserPropertyRepository } from "../../repositories";

export const startConsumers = async () => {
    const userPropertyRepository = new UserPropertyRepository();
    const updateUserDetailsUseCase = new UpdateUserDetailsUseCase(userPropertyRepository);
    const updateUserDetailsListener = new UpdateUserPropertyListener(updateUserDetailsUseCase);
    const rabbitMQClient = new RabbitMQClient();
    const rabbitMQConsumer = new RabbitMQConsumer(rabbitMQClient, updateUserDetailsListener);

    await rabbitMQConsumer.start();
    console.log("RabbitMQ consumer started");
};
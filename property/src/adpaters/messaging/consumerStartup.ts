import { RabbitMQClient } from "../../infrastructure/rabbitMq/RabbitMQClient";
import { RabbitMQConsumer } from "../../infrastructure/rabbitMq/RabbitMQConsumer";
import { UpdateUserDetailsUseCase,PropertyBookingUseCase } from "../../usecase";
import { UpdateUserPropertyListener } from "./UserPropertyListener";
import { UserPropertyRepository ,PropertyRepository} from "../../repositories";
import { BookingUpdateListener } from "./BookingUpdateListener"; 

export const startConsumers = async () => {
    const userPropertyRepository = new UserPropertyRepository();
    const propertyRepository = new PropertyRepository()

    const updateUserDetailsUseCase = new UpdateUserDetailsUseCase(userPropertyRepository);
    const propertyBookingUseCase = new PropertyBookingUseCase(propertyRepository)

    const updateUserDetailsListener = new UpdateUserPropertyListener(updateUserDetailsUseCase);
    const bookingUpdateListener = new BookingUpdateListener(propertyBookingUseCase); 
    
    const rabbitMQClient = new RabbitMQClient();

    const rabbitMQConsumer = new RabbitMQConsumer(rabbitMQClient, updateUserDetailsListener, bookingUpdateListener); 

    await rabbitMQConsumer.start();
    console.log("RabbitMQ consumer started");
};
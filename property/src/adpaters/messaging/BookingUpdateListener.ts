import {  ConsumeMessage } from 'amqplib';
import { PropertyBookingUseCase } from "../../usecase";

export class BookingUpdateListener {
    constructor(private propertyBookingUseCase:PropertyBookingUseCase){}
    async handle(msg: ConsumeMessage | null): Promise<void> {
        if (msg) {
            try {
                const content = JSON.parse(msg.content.toString());
                const { propertyId, userId, bookingDate, name } = content;

                await this.propertyBookingUseCase.update(propertyId, userId, bookingDate, name);

            } catch (error) {
                console.error('Failed to process booking update:', error);
            }
        }
    }
}
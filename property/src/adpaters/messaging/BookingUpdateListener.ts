import {  ConsumeMessage } from 'amqplib';
import { PropertyBookingUseCase,PropertyBookedUseCase } from "../../usecase";

export class BookingUpdateListener {
    constructor(private propertyBookingUseCase:PropertyBookingUseCase,
                private propertyBookedUseCase:PropertyBookedUseCase
    ){}
    async handle(msg: ConsumeMessage | null): Promise<void> {
        if (msg) {
            try {
                const content = JSON.parse(msg.content.toString());
                console.log(content,"content checking")
                if(content.name){
                    const { propertyId, userId, bookingDate, name,amountPaid,bookingId } = content;
                    await this.propertyBookingUseCase.update(propertyId, userId, bookingDate, name,amountPaid,bookingId);
                }else{
                    const { propertyId,  status,bookedId } = content;
                    await this.propertyBookedUseCase.update(propertyId,status,bookedId)
                }
            } catch (error) {
                console.error('Failed to process booking update:', error);
            }
        }
    }
}
import { BookingInterface } from '../repositories/interface/BookingInterface';
import { RabbitMQPublisher } from '../infrastrucuture/rabbitmq/rabbitmqPublisher';


export class CloseDealUseCase {
    constructor(
        private bookingRepository: BookingInterface,
        private rabbitMQPublisher: RabbitMQPublisher
    ) { }

    async closeDeal(bookingId: string): Promise<void> {
        try {
            const booking = await this.bookingRepository.findOneWithPopulation({ _id: bookingId }, 'userId', 'propertyId');

            if (!booking) {
                throw new Error('Booking not found');
            }

            const sellPrice = parseInt(booking.propertyId.sellPrice);
            const depositAmount =parseInt( booking.propertyId.depositAmount);
            let updateData;

            if (sellPrice > 0) {
                updateData = {
                    status: 'booked' as const, 
                    amountPaid: parseInt(sellPrice.toFixed(2)),
                };
            } else {
                updateData = {
                    status: 'booked' as const,
                    amountPaid: parseInt(depositAmount.toFixed(2)),
                };
            }

            const updatedBooking = await this.bookingRepository.updateOneWithPopulation(
                { _id: bookingId },
                updateData,
                'userId',
                'propertyId'
            );

            if (!updatedBooking) {
                throw new Error('Error updating booking');
            }

            const propertyId = booking.propertyId._id.toString()
            const status = 'booked'
            const bookedId = booking._id!

            await this.rabbitMQPublisher.publishBookedData(propertyId,status,bookedId)

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
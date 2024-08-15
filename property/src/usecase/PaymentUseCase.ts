import { RabbitMQPublisherInterface } from '../repositories';
import { PaymentService } from '../service/PaymentService';

export class PaymentUseCase {
    constructor(private paymentService: PaymentService,
                private rabbitMQPublisher: RabbitMQPublisherInterface
    ) { }
    async execute(amount: number, propertyId: string, id: string): Promise<any> {
        const session = await this.paymentService.createPaymentIntent(amount, propertyId);
        await this.rabbitMQPublisher.publish('user_updates', 'update', { id, count: 1, change:'sponsoredPosted' });
        return session
    }
}

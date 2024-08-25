import { Property } from '../entities/propertyEntity';
import { StripeService } from '../infrastructure/Stripe/StripeService';
import { PropertyInterface } from '../repositories/';

export class SuccessPaymentUseCase {
  constructor(
    private propertyRepository: PropertyInterface,
    private stripeService: StripeService
  ) {}

    async processPayment(sessionId: string, propertyId: string): Promise<{ propertyId: string; amount: number; transactionId: string }> {
      try {
        const session = await this.stripeService.retrieveSession(sessionId);
  
        if (session.payment_status !== 'paid') {
          throw new Error('Payment not successful');
        }
  
        const property = await this.propertyRepository.findOne({ _id: propertyId });
  
        if (!property) {
          throw new Error('Property not found');
        }
  
        let isUpdated = false;
        if (!property.sponsorship || !property.sponsorship.isSponsored) {
          const updatedProperty: Partial<Property> = {
            sponsorship: {
              isSponsored: true,
              details: {
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
                amount: session.amount_total ? session.amount_total / 100 : 0,
              },
            }
          };
          await this.propertyRepository.updateProperty(propertyId, updatedProperty);
          isUpdated = true;
        }
  
        return {
          propertyId,
          amount: session.amount_total ? session.amount_total / 100 : 0, 
          transactionId: session.id
        };
      } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
      }
    }
}
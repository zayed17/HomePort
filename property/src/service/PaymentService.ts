import Stripe from 'stripe';

export class PaymentService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    async createPaymentIntent(amount: number, propertyId: string) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: 'Property Sponsorship',
                            },
                            unit_amount: amount,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                // success_url: `http://localhost:5173/profile/properties`,
                // cancel_url: 'http://localhost:5173/payment-error',
                success_url: `https://api.homeport.online/profile/properties`,
                cancel_url: 'https://api.homeport.online/payment-error',
                metadata: {
                    propertyId: propertyId, 
                },
            });
            return session;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw new Error('Payment creation failed');
        }
    }
}
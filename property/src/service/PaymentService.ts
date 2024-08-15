import Stripe from 'stripe';

export class PaymentService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    async createPaymentIntent(amount: number, propertyId: string) {
        return this.stripe.checkout.sessions.create({
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
            success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}&property_id=${propertyId}`,
            cancel_url: 'http://localhost:5173/payment-error',
        });
    }
}
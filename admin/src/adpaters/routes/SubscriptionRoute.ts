import { Router} from 'express';
import { SubscriptionController } from '../controller/subscriptionController';
import {AddSubscriptionUseCase,FindAllSubscriptionUseCase} from '../../useCase'
import {SubscriptionRepository} from '../../repositories/implementation/subscriptionRepository'

import Stripe from 'stripe';
import { authenticateToken } from 'homepackage';

const stripe =new Stripe('sk_test_51Pkesm094jYnWAeuaCqHqijaQyfRv8avZ38f6bEUyTy7i7rVbOc8oyxFCn6Ih1h2ggzloqcECKBcach0PiWH8Jde00yYqaCtTB');



const subscriptionRepository = new SubscriptionRepository()

const addSubscriptionUseCase = new AddSubscriptionUseCase(subscriptionRepository)
const findAllSubscriptionUseCase = new FindAllSubscriptionUseCase(subscriptionRepository)

const subscriptionController = new SubscriptionController(addSubscriptionUseCase,findAllSubscriptionUseCase)

const router = Router()

router.post('/add-subscription' ,(req, res, next) => subscriptionController.addSubscription(req, res,next));
router.get('/subscriptions' ,(req, res, next) => subscriptionController.getSubscriptions(req, res,next));

router.post('/payment-intent', authenticateToken(['user']),async (req:any, res) => {
  const { amount, planId, autoRenew, durationInDays, subscriptionType, propertyLimit , sponsoredLimit} = req.body;
  const userId = req.user._id

  try {
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
              price_data: {
                  currency: 'inr', 
                  product_data: {
                      name: `Subscription for plan ${planId}`,
                  },
                  unit_amount: Math.floor(amount), 
              },
              quantity: 1,
          }],
          mode: 'payment',
          success_url: 'https://homeport.online/subscription?session_id={CHECKOUT_SESSION_ID}', 
          cancel_url: 'https://homeport.online/api/chat/cancel', 
          metadata: {
            userId, 
              planId,
              autoRenew,
              subscriptionType,
              durationInDays,
              propertyLimit,
              sponsoredLimit,
              price:amount/100
          }
      });

      res.json({ id: session.id });
  } catch (error:any) {
      console.error('Error creating checkout session:', error.message); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;

import { Router} from 'express';
import { SubscriptionController } from '../controller/subscriptionController';
import {AddSubscriptionUseCase,FindAllSubscriptionUseCase} from '../../useCase'
import {SubscriptionRepository} from '../../repositories/implementation/subscriptionRepository'

const subscriptionRepository = new SubscriptionRepository()

const addSubscriptionUseCase = new AddSubscriptionUseCase(subscriptionRepository)
const findAllSubscriptionUseCase = new FindAllSubscriptionUseCase(subscriptionRepository)

const subscriptionController = new SubscriptionController(addSubscriptionUseCase,findAllSubscriptionUseCase)

const router = Router()

router.post('/add-subscription' ,(req, res, next) => subscriptionController.addSubscription(req, res,next));
router.get('/subscriptions' ,(req, res, next) => subscriptionController.getSubscriptions(req, res,next));

export default router;

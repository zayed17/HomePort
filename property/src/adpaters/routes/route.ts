import { Router } from "express";
import express, { Request, Response, NextFunction } from 'express';
import { PropertyController } from "../controller/PropertyController";
import { AddPropertyUseCase ,FindPendingPropertyUseCase,RejectPropertyUseCase,VerifyPropertyUseCase,FindPropertyUseCase,FindAllPropertiesUseCase,FindAdminPropertiesUseCase,BlockUnblockUseCase,AddUserUseCase,FindUserUseCase,ToggleFavouriteUseCaseUseCase,SuccessPaymentUseCase,FindFavouritesUseCase} from '../../usecase';
import { S3Repository, PropertyRepository,UserPropertyRepository } from '../../repositories';
import { S3Service } from "../../infrastructure";
import upload from '../../infrastructure/middleware/multerMiddleware'
import PropertyModel from "../../infrastructure/mongodb/PropertyModel";
import { StripeService } from '../../infrastructure/Stripe/StripeService';
import { authenticateToken } from 'homepackage'

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Pkesm094jYnWAeuaCqHqijaQyfRv8avZ38f6bEUyTy7i7rVbOc8oyxFCn6Ih1h2ggzloqcECKBcach0PiWH8Jde00yYqaCtTB')

const s3Service = new S3Service();
const stripeService = new StripeService()
// Initialize repositories with required services
const s3Repository = new S3Repository(s3Service);
const propertyRepository = new PropertyRepository();
const userPropertyRepository = new UserPropertyRepository()

// Initialize use cases with required repositories
const addPropertyUseCase = new AddPropertyUseCase(s3Repository, propertyRepository);
const findPendingPropertyUseCase = new FindPendingPropertyUseCase(propertyRepository)
const rejectPropertyUseCase = new RejectPropertyUseCase(propertyRepository)
const verifyPropertyUseCase = new VerifyPropertyUseCase(propertyRepository)
const findPropertyUseCase = new FindPropertyUseCase(propertyRepository)
const findAllPropertiesUseCase = new FindAllPropertiesUseCase(propertyRepository)
const findAdminPropertiesUseCase = new FindAdminPropertiesUseCase(propertyRepository)
const blockUnblockUseCase = new BlockUnblockUseCase(propertyRepository)
const addUserUseCase = new AddUserUseCase(userPropertyRepository)
const findUserUseCase = new FindUserUseCase(userPropertyRepository)
const toggleFavouriteUseCaseUseCase = new ToggleFavouriteUseCaseUseCase(userPropertyRepository)
const successPaymentUseCase = new SuccessPaymentUseCase(propertyRepository,stripeService)
const findFavouritesUseCase = new FindFavouritesUseCase(userPropertyRepository)




// Initialize controllers with required use cases
const propertyController = new PropertyController(addPropertyUseCase,findPendingPropertyUseCase,verifyPropertyUseCase,rejectPropertyUseCase,findPropertyUseCase,findAllPropertiesUseCase,findAdminPropertiesUseCase,blockUnblockUseCase,findUserUseCase,addUserUseCase,toggleFavouriteUseCaseUseCase,successPaymentUseCase,findFavouritesUseCase);

const router = Router();

router.post('/add-property',authenticateToken(['user']), upload ,(req, res, next) => propertyController.addProperty(req, res, next));
router.get('/list-properties', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('this is workding')
      const properties = await PropertyModel.find({status:'verified'}).populate('createdBy')
      console.log(properties,"consoleing")
      res.json(properties); 
    } catch (error) {
      next(error); 
    }
  });
router.get('/properties/pending',(req, res, next) => propertyController.getPendingProperties(req, res, next));
router.post('/properties/verify/:id',(req, res, next) => propertyController.verifyProperty(req, res, next));
router.post('/properties/reject/:id',(req, res, next) => propertyController.rejectProperty(req, res, next));
router.get('/property/:id',(req, res, next) => propertyController.getProperty(req, res, next));
router.get('/properties',authenticateToken(['user']),(req, res, next) => propertyController.findAllProperties(req, res, next));
router.get('/adminProperties',(req, res, next) => propertyController.findAdminProperties(req, res, next));
router.patch('/block-unblock',(req, res, next) => propertyController.blockUblock(req, res, next));

router.patch('/favorite-update',authenticateToken(['user']),(req, res, next) => propertyController.toggleFavourite(req, res, next));
router.post('/payment-intent', async (req, res) => {
  const { amount, propertyId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
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

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error.message "});
  }
});

router.post('/payment-success',(req, res, next) => propertyController.SuccessPayment(req, res, next));
router.get('/favourite-property',authenticateToken(['user']),(req, res, next) => propertyController.findFavourites(req, res, next));

export default router;
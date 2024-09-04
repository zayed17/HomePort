import { Router } from "express";
import  { Request, Response, NextFunction } from 'express';
import { PropertyController } from "../controller/PropertyController";
import { AddPropertyUseCase ,FindPendingPropertyUseCase,RejectPropertyUseCase,VerifyPropertyUseCase,FindPropertyUseCase,FindAllPropertiesUseCase,FindAdminPropertiesUseCase,BlockUnblockUseCase,AddUserUseCase,FindUserUseCase,ToggleFavouriteUseCaseUseCase,SuccessPaymentUseCase,FindFavouritesUseCase,AddReportUseCase,FindAllReportsUseCase,PaymentUseCase,UpdatePropertyUseCase,DashboardPropertiesUseCase,RepostPropertyUseCase,AdminDashboardUseCase} from '../../usecase';
import { S3Repository, PropertyRepository,UserPropertyRepository,ReportPropertyRepository,NotificationRepository } from '../../repositories';
import { S3Service } from "../../infrastructure";
import { RabbitMQPublisher } from '../../infrastructure/rabbitMq/RabbitMQPulisher';
import upload from '../../infrastructure/middleware/multerMiddleware'
import PropertyModel from "../../infrastructure/mongodb/PropertyModel";
import { StripeService } from '../../infrastructure/Stripe/StripeService';
import { PaymentService } from '../../service/PaymentService';
import { authenticateToken } from 'homepackage'

import { checking } from "./Just";


const s3Service = new S3Service();
const stripeService = new StripeService()
const paymentService = new PaymentService()
// Initialize repositories with required services
const s3Repository = new S3Repository(s3Service);
const propertyRepository = new PropertyRepository();
const userPropertyRepository = new UserPropertyRepository()
const reportPropertyRepository = new ReportPropertyRepository()
const rabbitMQPublisher = new RabbitMQPublisher('amqp://rabbitmq:5672')
const notificationRepository = new NotificationRepository('http://localhost:3000')
// Initialize use cases with required repositories
const addPropertyUseCase = new AddPropertyUseCase(s3Repository, propertyRepository,rabbitMQPublisher);
const findPendingPropertyUseCase = new FindPendingPropertyUseCase(propertyRepository)
const rejectPropertyUseCase = new RejectPropertyUseCase(propertyRepository,notificationRepository)
const verifyPropertyUseCase = new VerifyPropertyUseCase(propertyRepository,notificationRepository)
const findPropertyUseCase = new FindPropertyUseCase(propertyRepository)
const findAllPropertiesUseCase = new FindAllPropertiesUseCase(propertyRepository)
const findAdminPropertiesUseCase = new FindAdminPropertiesUseCase(propertyRepository)
const blockUnblockUseCase = new BlockUnblockUseCase(propertyRepository)
const addUserUseCase = new AddUserUseCase(userPropertyRepository)
const findUserUseCase = new FindUserUseCase(userPropertyRepository)
const toggleFavouriteUseCaseUseCase = new ToggleFavouriteUseCaseUseCase(userPropertyRepository)
const successPaymentUseCase = new SuccessPaymentUseCase(propertyRepository,stripeService)
const findFavouritesUseCase = new FindFavouritesUseCase(userPropertyRepository)
const addReportUseCase = new AddReportUseCase(reportPropertyRepository)
const findAllReportsUseCase = new FindAllReportsUseCase(reportPropertyRepository)
const paymentUseCase = new PaymentUseCase(paymentService,rabbitMQPublisher)
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyRepository)
const dashboardPropertiesUseCase = new DashboardPropertiesUseCase(propertyRepository)
const rabbitMqepostPropertyUseCase = new RepostPropertyUseCase(s3Repository, propertyRepository)
const adminDashboardUseCase = new AdminDashboardUseCase(propertyRepository)



// Initialize controllers with required use cases
const propertyController = new PropertyController(addPropertyUseCase,findPendingPropertyUseCase,verifyPropertyUseCase,rejectPropertyUseCase,findPropertyUseCase,findAllPropertiesUseCase,findAdminPropertiesUseCase,blockUnblockUseCase,findUserUseCase,addUserUseCase,toggleFavouriteUseCaseUseCase,successPaymentUseCase,findFavouritesUseCase,addReportUseCase,findAllReportsUseCase,paymentUseCase,updatePropertyUseCase,dashboardPropertiesUseCase,rabbitMqepostPropertyUseCase,adminDashboardUseCase);

const router = Router();

router.post('/add-property',authenticateToken(['user']), upload ,(req, res, next) => propertyController.addProperty(req, res, next));
router.get('/list-properties',authenticateToken(['user']), async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id
        const properties = await PropertyModel.find({status: 'verified',createdBy: { $ne: userId }}).populate('createdBy').sort({ 'sponsorship.isSponsored': -1 });
      res.json(properties); 
    } catch (error) {
      next(error); 
    }
  });

router.get('/list-properties-public',  async (req: any, res: Response, next: NextFunction) => {
  try {
      const properties = await PropertyModel.find({status:'verified'}).populate('createdBy').sort({ 'sponsorship.isSponsored': -1 });

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
router.get('/admin-dashboard',(req, res, next) => propertyController.getAdminDashboard(req, res, next));
router.patch('/block-unblock',(req, res, next) => propertyController.blockUblock(req, res, next));
router.get('/dashboard-properties',authenticateToken(['user']),(req, res, next) => propertyController.dashboardProperties(req, res, next));
router.patch('/favorite-update',authenticateToken(['user']),(req, res, next) => propertyController.toggleFavourite(req, res, next));
router.post('/payment-intent',authenticateToken(['user']),checking,(req, res, next) => propertyController.createPaymentIntent(req, res, next));
router.post('/sponsored-success',(req, res, next) => propertyController.handleWebhook(req, res, next));
router.get('/favourite-property',authenticateToken(['user']),(req, res, next) => propertyController.findFavourites(req, res, next));
router.post('/report-property',authenticateToken(['user']),(req, res, next) => propertyController.addReport(req, res, next));
router.get('/reports',(req, res, next) => propertyController.findReports(req, res, next));
router.post('/update-property',authenticateToken(['user']), upload ,(req, res, next) => propertyController.RepostProperty(req, res, next));


export default router;    
import express, { Router } from 'express';
import { UserController } from '../express/controllers/UserController';
import { SignUpUseCase, LoginUseCase, OTPVerificationUseCase, GetUserDetailUsecase, UpdateUsecase, UploadImageUseCase, ResendOTPUseCase, GoogleAuthUseCase, VerifyEmailUseCase, ForgotPasswordUseCase, ChangePasswordUseCase, FindAllUserUseCase, BlockUnblockUseCase, PublishUserUpdateUseCase, UpdateUserSubscriptionUsecase ,UserAdminDashboardUseCase,GetSingleUserUsecase} from '../../../usecases';
import { UserRepository, EmailRepository, RedisOTPRepository, S3Repository, GoogleAuthRepository,UserSubscriptionRepository,NotificationRepository } from '../../../repositories';
import { authenticateToken,refreshToken } from 'homepackage'

import upload from '../express/middleware/uploadMiddleware'
import { MessageBrokerService } from '../../../services/MessageBrokerService';

import Stripe from 'stripe';
import UserModel from '../../../infrastructure/database/models/UserModel';
import SubscriptionModel from '../../../infrastructure/database/models/SubscriptionModel';
import { RabbitMQConsumer } from '../../../infrastructure/rabbitMq/RabbitMQConsumer';
import { RabbitMQClient } from '../../../infrastructure/rabbitMq/RabbitMQClient';
const stripe = new Stripe('sk_test_51Pkesm094jYnWAeuaCqHqijaQyfRv8avZ38f6bEUyTy7i7rVbOc8oyxFCn6Ih1h2ggzloqcECKBcach0PiWH8Jde00yYqaCtTB');

const endpointSecret = 'whsec_ROxldQwb16SNlaBqMd7RtxVqNnmz1vVu';

const userRepository = new UserRepository();
const otpService = new RedisOTPRepository();
const emailService = new EmailRepository();
const s3Repository = new S3Repository();
const googleAuthRepository = new GoogleAuthRepository()
const messageBrokerService = new MessageBrokerService()
const userSubscriptionRepository = new UserSubscriptionRepository()
const notificationRepository = new NotificationRepository(process.env.NOTIFICATION_API_URL || "http://localhost:3000") 

const signUpUseCase = new SignUpUseCase(userRepository, otpService, emailService);
const loginUseCase = new LoginUseCase(userRepository);
const otpVerificationUseCase = new OTPVerificationUseCase(otpService, userRepository);
const getUserDetailUseCase = new GetUserDetailUsecase(userRepository)
const updateUseCase = new UpdateUsecase(userRepository)
const uploadImageUseCase = new UploadImageUseCase(s3Repository, userRepository)
const resendOTPUseCase = new ResendOTPUseCase(emailService, otpService)
const googleAuthUseCase = new GoogleAuthUseCase(userRepository, googleAuthRepository)
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository)
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)
const findAllUserUseCase = new FindAllUserUseCase(userRepository)
const blockUnblockUseCase = new BlockUnblockUseCase(userRepository,notificationRepository)
const publishUserUpdateUseCase = new PublishUserUpdateUseCase(messageBrokerService)
const updateUserSubscriptionUsecase = new UpdateUserSubscriptionUsecase(userRepository)
const userAdminDashboardUseCase = new UserAdminDashboardUseCase(userRepository,userSubscriptionRepository)
const getSingleUserUseCase = new GetSingleUserUsecase(userRepository)
const rabbitMQClient= new RabbitMQClient()
const rabbitMQConsumer = new RabbitMQConsumer(rabbitMQClient, updateUserSubscriptionUsecase);

rabbitMQConsumer.start().catch(console.error);

const userController = new UserController(signUpUseCase, loginUseCase, otpVerificationUseCase, getUserDetailUseCase, updateUseCase, uploadImageUseCase, resendOTPUseCase, googleAuthUseCase, verifyEmailUseCase, forgotPasswordUseCase, changePasswordUseCase, findAllUserUseCase, blockUnblockUseCase, publishUserUpdateUseCase,userAdminDashboardUseCase,getSingleUserUseCase);


const router = Router();


router.post('/signup', (req, res, next) => userController.signUpUser(req, res, next));
router.post('/login', (req, res, next) => userController.loginUser(req, res, next));
router.post('/verifyOtp', (req, res, next) => userController.verifyOTP(req, res, next));
router.post('/resendOTP', (req, res, next) => userController.resendOTP(req, res, next));
router.post('/google', (req, res, next) => userController.googleAuth(req, res, next));
router.post('/verifyEmail', (req, res, next) => userController.verifyEmail(req, res, next));
router.put('/forgetPassword', (req, res, next) => userController.forgotPassword(req, res, next));
router.put('/changePassword', authenticateToken(['user']), (req, res, next) => userController.changePassword(req, res, next));
router.get('/getUser', authenticateToken(['user']), (req, res, next) => userController.getUser(req, res, next));
router.get('/check-auth', authenticateToken(['user']), (req, res, next) => userController.checkAuth(req, res, next));
router.get('/details/:id',(req, res, next) => userController.getDetails(req, res, next));
router.post('/logout',(req, res, next) => userController.logout(req, res, next));
router.get('/id/:id',(req, res, next) => userController.getSingleUser(req, res, next));

// router.put('/updateProfile', authenticateToken(['user']), (req, res, next) => userController.updateUser(req, res, next));
router.post('/uploadImage', authenticateToken(['user']), upload.single('photo'), (req, res, next) => userController.uploadImage(req, res, next));
router.get('/findAll', (req, res, next) => userController.findAllUsers(req, res, next));
router.get('/admin-dashboard', (req, res, next) => userController.userAdminDashboard(req, res, next));

router.patch('/block-unblock', (req, res, next) => userController.blockUblock(req, res, next));
router.post('/refresh-token', refreshToken);

router.post('/subscription', async (req: any, res: express.Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const rawBody = req.body as Buffer;

  if (!sig) {
    return res.status(400).send('Missing Stripe signature');
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session?.metadata?.userId;
    const subscriptionType = session?.metadata?.subscriptionType;
    const propertyLimit = session?.metadata?.propertyLimit;
    const sponsoredLimit = session?.metadata?.sponsoredLimit;
    const price =  session?.metadata?.price;
    const startDate = new Date();
    const durationInDays = parseInt(session?.metadata?.durationInDays!, 10);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationInDays);

    try {
      const subscription = await SubscriptionModel.findOneAndUpdate(
        { userId },
        {
          $set: {
            type: subscriptionType,
            startDate,
            endDate,
            propertyLimit,
            sponsoredLimit,
            price
          }
        },
        { upsert: true, new: true }
      );

      if (!subscription) {
        throw new Error('Failed to create or update subscription');
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { subscriptionId: subscription._id },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('Failed to update user with subscription reference');
      }
      console.log('User subscription updated successfully.');
    } catch (err) {
      console.error('Failed to update user subscription:', err);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    console.warn(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;

import { Router} from 'express';
import { UserController } from '../express/controllers/UserController';
import { SignUpUseCase ,LoginUseCase, OTPVerificationUseCase,GetUserDetailUsecase,UpdateUsecase,UploadImageUseCase,ResendOTPUseCase,GoogleAuthUseCase,VerifyEmailUseCase,ForgotPasswordUseCase, ChangePasswordUseCase} from '../../../usecases';
import { UserRepository,EmailRepository,RedisOTPRepository,S3Repository,GoogleAuthRepository} from '../../../repositories';
import {authenticateToken} from '../../../../../HomePackage/src/index'
import upload from '../express/middleware/uploadMiddleware'

const userRepository = new UserRepository();
const otpService = new RedisOTPRepository();
const emailService = new EmailRepository();
const s3Repository = new S3Repository();
const googleAuthRepository = new GoogleAuthRepository()

const signUpUseCase = new SignUpUseCase(userRepository, otpService, emailService);
const loginUseCase = new LoginUseCase(userRepository);
const otpVerificationUseCase = new OTPVerificationUseCase(otpService, userRepository);
const getUserDetailUseCase = new GetUserDetailUsecase(userRepository)
const updateUseCase = new UpdateUsecase(userRepository)
const uploadImageUseCase = new UploadImageUseCase(s3Repository,userRepository)
const resendOTPUseCase = new ResendOTPUseCase(emailService,otpService)
const googleAuthUseCase = new GoogleAuthUseCase(userRepository,googleAuthRepository)
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository)
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)

const userController = new UserController(signUpUseCase, loginUseCase, otpVerificationUseCase,getUserDetailUseCase,updateUseCase,uploadImageUseCase,resendOTPUseCase,googleAuthUseCase,verifyEmailUseCase,forgotPasswordUseCase,changePasswordUseCase);

const router = Router();


router.post('/signup', (req, res, next) => userController.signUpUser(req, res, next));
router.post('/login',(req, res, next) => userController.loginUser(req, res, next));
router.post('/verifyOtp', (req, res,next) => userController.verifyOTP(req, res,next));
router.post('/resendOTP',(req,res,next)=>userController.resendOTP(req,res,next));
router.post('/google',(req,res,next)=>userController.googleAuth(req,res,next));
router.post('/verifyEmail',(req,res,next)=>userController.verifyEmail(req,res,next));
router.post('/forgetPassword',(req,res,next)=>userController.forgotPassword(req,res,next));
router.put('/changePassword',(req,res,next)=>userController.changePassword(req,res,next));
router.get('/getUser',authenticateToken(['user','owner']),(req,res,next)=>userController.getUser(req,res,next));
router.post('/updateProfile',authenticateToken(['user','owner']),(req,res,next)=>userController.updateUser(req,res,next));
router.post('/uploadImage',authenticateToken(['user','owner']),upload.single('photo'),(req,res,next)=>userController.uploadImage(req,res,next));

export default router;

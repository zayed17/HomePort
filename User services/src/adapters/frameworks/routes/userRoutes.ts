import { Router } from 'express';
import { UserController } from '../express/controllers/UserController';
import { SignUpUseCase, LoginUseCase, OTPVerificationUseCase, GetUserDetailUsecase, UpdateUsecase, UploadImageUseCase, ResendOTPUseCase, GoogleAuthUseCase, VerifyEmailUseCase, ForgotPasswordUseCase, ChangePasswordUseCase, FindAllUserUseCase ,BlockUnblockUseCase,PublishUserUpdateUseCase} from '../../../usecases';
import { UserRepository, EmailRepository, RedisOTPRepository, S3Repository, GoogleAuthRepository } from '../../../repositories';
import { authenticateToken } from 'homepackage'
import upload from '../express/middleware/uploadMiddleware'
import { MessageBrokerService } from '../../../services/MessageBrokerService';


const userRepository = new UserRepository();
const otpService = new RedisOTPRepository();
const emailService = new EmailRepository();
const s3Repository = new S3Repository();
const googleAuthRepository = new GoogleAuthRepository()
const messageBrokerService = new MessageBrokerService()


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
const blockUnblockUseCase = new BlockUnblockUseCase(userRepository)
const publishUserUpdateUseCase = new PublishUserUpdateUseCase(messageBrokerService)


const userController = new UserController(signUpUseCase, loginUseCase, otpVerificationUseCase, getUserDetailUseCase, updateUseCase, uploadImageUseCase, resendOTPUseCase, googleAuthUseCase, verifyEmailUseCase, forgotPasswordUseCase, changePasswordUseCase, findAllUserUseCase, blockUnblockUseCase,publishUserUpdateUseCase);


const router = Router();


router.post('/signup', (req, res, next) => userController.signUpUser(req, res, next));
router.post('/login', (req, res, next) => userController.loginUser(req, res, next));
router.post('/verifyOtp', (req, res, next) => userController.verifyOTP(req, res, next));
router.post('/resendOTP', (req, res, next) => userController.resendOTP(req, res, next));
router.post('/google', (req, res, next) => userController.googleAuth(req, res, next));
router.post('/verifyEmail', (req, res, next) => userController.verifyEmail(req, res, next));
router.put('/forgetPassword',(req, res, next) => userController.forgotPassword(req, res, next));
router.put('/changePassword', authenticateToken(['user']), (req, res, next) => userController.changePassword(req, res, next));
router.get('/getUser', authenticateToken(['user']), (req, res, next) => userController.getUser(req, res, next));
// router.put('/updateProfile', authenticateToken(['user']), (req, res, next) => userController.updateUser(req, res, next));
router.post('/uploadImage', authenticateToken(['user']), upload.single('photo'), (req, res, next) => userController.uploadImage(req, res, next));
router.get('/findAll', (req, res, next) => userController.findAllUsers(req, res, next));
router.patch('/block-unblock', (req, res, next) => userController.blockUblock(req, res, next));



export default router;

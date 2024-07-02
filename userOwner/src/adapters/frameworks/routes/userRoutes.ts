import { Router } from 'express';
import { UserController } from '../express/controllers/UserController';
import { SignUpUseCase ,LoginUseCase, OTPVerificationUseCase} from '../../../usecases';
import { UserRepository, } from '../../../repositories/implementation/UserRepository';
import { RedisOTPRepository } from '../../../repositories/implementation/RedisRepository';
import { EmailRepository } from '../../../repositories/implementation/EmailRepository';

const userRepository = new UserRepository();
const otpService = new RedisOTPRepository();
const emailService = new EmailRepository();

const signUpUseCase = new SignUpUseCase(userRepository, otpService, emailService);
const loginUseCase = new LoginUseCase(userRepository);
const otpVerificationUseCase = new OTPVerificationUseCase(otpService, userRepository);

const userController = new UserController(signUpUseCase, loginUseCase, otpVerificationUseCase);

const router = Router();

router.post('/signup', (req, res, next) => userController.signUpUser(req, res, next));
router.post('/login', (req, res, next) => userController.loginUser(req, res, next));
router.post('/verify-otp', (req, res) => userController.verifyOTP(req, res));

export default router;

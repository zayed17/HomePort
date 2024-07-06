import { Router ,Response,Request} from 'express';
import { UserController } from '../express/controllers/UserController';
import { SignUpUseCase ,LoginUseCase, OTPVerificationUseCase,GetUserDetail} from '../../../usecases';
import { UserRepository, } from '../../../repositories/implementation/UserRepository';
import { RedisOTPRepository } from '../../../repositories/implementation/RedisRepository';
import { EmailRepository } from '../../../repositories/implementation/EmailRepository';
import {authenticateToken} from '../../../../../HomePackage/src/index'
import axios from 'axios'
import {OAuth2Client} from 'google-auth-library'

const userRepository = new UserRepository();
const otpService = new RedisOTPRepository();
const emailService = new EmailRepository();

const signUpUseCase = new SignUpUseCase(userRepository, otpService, emailService);
const loginUseCase = new LoginUseCase(userRepository);
const otpVerificationUseCase = new OTPVerificationUseCase(otpService, userRepository);
const getUserDetail = new GetUserDetail(userRepository)

const userController = new UserController(signUpUseCase, loginUseCase, otpVerificationUseCase,getUserDetail);

const router = Router();

const CLIENT_ID = '550849310987-7ldblcs20utp0hrsqk819p4tqp590ram.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5001/user/google/callback';

// router.post('/google-auth', async (req: Request, res: Response) => {
//   try {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
//   res.redirect(url);
//   } catch (error) {
//     console.log(error)
//   }
//   });


//   router.post('/google/callback', async (req: Request, res: Response) => {
//     const { code } = req.query;
//     try {
//       const { data } = await axios.post('https://oauth2.googleapis.com/token', {
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       code,
//       redirect_uri: REDIRECT_URI,
//       grant_type: 'authorization_code',
//     });

//     const { access_token, id_token } = data;
//     const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//       headers: { Authorization: `Bearer ${access_token}` },
//     });
//     res.redirect('/');
//     } catch (error) {
//       console.log(error)
//     }
//     });
  


router.post('/google-auth', async (req, res) => {
  const { code } = req.body; 
  console.log("Received code:", code);

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;
    console.log("Tokens received:", data);

    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    console.log("User profile received:", profile);
    res.json(profile); 
  } catch (error) {
    console.error("Error during OAuth process:", error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});


router.post('/signup', (req, res, next) => userController.signUpUser(req, res, next));
router.post('/login',(req, res, next) => userController.loginUser(req, res, next));
router.post('/verifyOtp', (req, res) => userController.verifyOTP(req, res));
router.get('/getUser',authenticateToken,(req,res)=>userController.getUser(req,res))

export default router;

import { Router } from 'express';

import { signUpUser,loginUser, verifyOTP } from '../express/controllers/UserController';

const router = Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/verifyOtp',verifyOTP)

export default router;

import { Router } from 'express';

import { signUpUser } from '../../../adapters/frameworks/express/controllers/UserController';

const router = Router();

router.post('/signup', signUpUser);

export default router;

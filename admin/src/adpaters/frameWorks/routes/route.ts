import { Router} from 'express';
import { AdminController } from '../adminController';
import {AdminUseCase} from '../../../useCase/AdminUseCase'
import {AdminRepository} from '../../../repositories/implementation/adminRepository'

const adminRepository = new AdminRepository()

const adminUseCase = new AdminUseCase(adminRepository)

const adminController = new AdminController(adminUseCase)

const router = Router()

router.post('/login' ,(req, res, next) => adminController.login(req, res));
export default router;

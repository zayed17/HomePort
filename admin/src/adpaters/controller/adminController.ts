import { NextFunction, Request, Response } from 'express';
import { AdminUseCase } from '../../useCase';

export class AdminController {
  constructor(private adminUseCase: AdminUseCase) { }

  async login(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { admin, token } = await this.adminUseCase.authenticate(email, password);

        const ress = res.cookie('Admintoken', token, {
          maxAge: 3600000,
        });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      next(error)
    }
  }
}
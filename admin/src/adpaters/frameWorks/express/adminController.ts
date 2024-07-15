import { Request, Response } from 'express';
import { AdminUseCase } from '../../../useCase/AdminUseCase';

export class AdminController {
  constructor(private adminUseCase: AdminUseCase) { }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { admin, token } = await this.adminUseCase.authenticate(email, password);

      if (admin) {
        const ress = res.cookie('Admintoken', token, {
          maxAge: 3600000,
        });
        console.log(ress, "checking")
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
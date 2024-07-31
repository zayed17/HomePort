import { Request, Response, NextFunction } from 'express';
import { AddPropertyUseCase, FindPendingPropertyUseCase, VerifyPropertyUseCase, RejectPropertyUseCase } from '../../usecase';

export class PropertyController {
  constructor(
    private addPropertyUseCase: AddPropertyUseCase,
    private findPendingPropertyUseCase: FindPendingPropertyUseCase,
    private verifyPropertyUseCase: VerifyPropertyUseCase,
    private rejectPropertyUseCase: RejectPropertyUseCase
  ) { }

  async addProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      console.log(files, "from controller ");

      const formData = req.body;
      const result = await this.addPropertyUseCase.addProperty(files, formData);
      res.status(201).json({ message: 'Property added successfully', result });
    } catch (error) {
      next(error);
    }
  }

  async getPendingProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findPendingPropertyUseCase.FindPendingProperty('pending');
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.verifyPropertyUseCase.verifyProperty(id);
      res.status(200).json({ message: 'Property verified successfully' });
    } catch (error) {
      next(error);
    }
  }
  async rejectProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      console.log(req.body,"checking what si ")
      const { reason } = req.body;
      await this.rejectPropertyUseCase.rejectProperty(id, reason);
      res.status(200).send({ message: 'Property rejected successfully' });
    } catch (error) {
      next(error);
    }
  }
}
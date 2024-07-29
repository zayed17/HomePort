import { Request, Response,NextFunction } from 'express';
import { AddPropertyUseCase } from '../../usecase';

export class PropertyController {
  private addPropertyUseCase: AddPropertyUseCase;

  constructor(addPropertyUseCase: AddPropertyUseCase) {
    this.addPropertyUseCase = addPropertyUseCase;
  }

  async addProperty(req: Request, res: Response,next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      console.log(files,"from controller ");
      
      const formData = req.body;
      const result = await this.addPropertyUseCase.addProperty(files, formData);
      res.status(201).json({ message: 'Property added successfully', result });
    } catch (error) {
        next(error);
    }
  }
}
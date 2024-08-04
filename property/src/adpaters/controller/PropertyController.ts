import { Request, Response, NextFunction } from 'express';
import { AddPropertyUseCase, FindPendingPropertyUseCase, VerifyPropertyUseCase, RejectPropertyUseCase, FindPropertyUseCase, FindAllPropertiesUseCase, FindAdminPropertiesUseCase, BlockUnblockUseCase, FindUserUseCase, AddUserUseCase, ToggleFavouriteUseCaseUseCase } from '../../usecase';
import { fetchUserDetails } from '../../infrastructure/userGrpcClient';

export class PropertyController {
  constructor(
    private addPropertyUseCase: AddPropertyUseCase,
    private findPendingPropertyUseCase: FindPendingPropertyUseCase,
    private verifyPropertyUseCase: VerifyPropertyUseCase,
    private rejectPropertyUseCase: RejectPropertyUseCase,
    private findPropertyUseCase: FindPropertyUseCase,
    private findAllPropertiesUseCase: FindAllPropertiesUseCase,
    private findAdminPropertiesUseCase: FindAdminPropertiesUseCase,
    private blockUnblockUseCase: BlockUnblockUseCase,
    private findUserUseCase: FindUserUseCase,
    private addUserUseCase: AddUserUseCase,
    private toggleFavouriteUseCaseUseCase: ToggleFavouriteUseCaseUseCase

  ) { }

  async addProperty(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      const id = req.user._id
      const user = await this.findUserUseCase.FindUser(id)
      if (!user) {
        const userDetails = await fetchUserDetails(id);
        await this.addUserUseCase.addUser(userDetails)
      }
      const formData = req.body;
      const result = await this.addPropertyUseCase.addProperty(files, formData, id);
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
      console.log(req.body, "checking what si ")
      const { reason } = req.body;
      await this.rejectPropertyUseCase.rejectProperty(id, reason);
      res.status(200).send({ message: 'Property rejected successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const result = await this.findPropertyUseCase.findProperty(id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAllProperties(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user._id
      const result = await this.findAllPropertiesUseCase.FindAllProperties(id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  async findAdminProperties(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.findAdminPropertiesUseCase.FindAdminProperties();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async blockUblock(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body, "from the current body")
    const { _id, newStatus } = req.body
    try {
      await this.blockUnblockUseCase.BlockUnblock(_id, newStatus)
      res.status(200).json({ success: true });
    } catch (error) {
      next(error)
    }
  }

  
  async toggleFavourite(req: any, res: Response, next: NextFunction): Promise<void> {
    console.log(req.body, "from the current body")
    const { propertyId, action } = req.body;
    const userId = req.user._id
    try {
      await this.toggleFavouriteUseCaseUseCase.toggleFavourite({propertyId,userId,action})
      res.status(200).json({ success: true });
    } catch (error) {
      next(error)
    }
  }
}
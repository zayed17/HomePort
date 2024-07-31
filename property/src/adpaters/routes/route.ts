import { Router } from "express";
import express, { Request, Response, NextFunction } from 'express';
import { PropertyController } from "../controller/PropertyController";
import { AddPropertyUseCase ,FindPendingPropertyUseCase,RejectPropertyUseCase,VerifyPropertyUseCase} from '../../usecase';
import { S3Repository, PropertyRepository } from '../../repositories';
import { S3Service } from "../../infrastructure";
import upload from '../../infrastructure/middleware/multerMiddleware'
import PropertyModel from "../../infrastructure/mongodb/PropertyModel";
const s3Service = new S3Service();

// Initialize repositories with required services
const s3Repository = new S3Repository(s3Service);
const propertyRepository = new PropertyRepository();

// Initialize use cases with required repositories
const addPropertyUseCase = new AddPropertyUseCase(s3Repository, propertyRepository);
const findPendingPropertyUseCase = new FindPendingPropertyUseCase(propertyRepository)
const rejectPropertyUseCase = new RejectPropertyUseCase(propertyRepository)
const verifyPropertyUseCase = new VerifyPropertyUseCase(propertyRepository)

// Initialize controllers with required use cases
const propertyController = new PropertyController(addPropertyUseCase,findPendingPropertyUseCase,verifyPropertyUseCase,rejectPropertyUseCase);

const router = Router();

router.post('/add-property', upload ,(req, res, next) => propertyController.addProperty(req, res, next));
router.get('/list-properties', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('this is workding')
      const properties = await PropertyModel.find(); 
      console.log(properties)
                res.json(properties); 
    } catch (error) {
      next(error); 
    }
  });
router.get('/properties/pending',(req, res, next) => propertyController.getPendingProperties(req, res, next));
router.post('/properties/verify/:id',(req, res, next) => propertyController.verifyProperty(req, res, next));
router.post('/properties/reject/:id',(req, res, next) => propertyController.rejectProperty(req, res, next));

  
export default router;
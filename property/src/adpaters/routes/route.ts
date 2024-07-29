import { Router } from "express";
import { PropertyController } from "../controller/PropertyController";
import { AddPropertyUseCase } from '../../usecase';
import { S3Repository, PropertyRepository } from '../../repositories';
import { S3Service } from "../../infrastructure";
import upload from '../../infrastructure/middleware/multerMiddleware'
// Initialize infrastructure services
const s3Service = new S3Service();

// Initialize repositories with required services
const s3Repository = new S3Repository(s3Service);
const propertyRepository = new PropertyRepository();

// Initialize use cases with required repositories
const addPropertyUseCase = new AddPropertyUseCase(s3Repository, propertyRepository);

// Initialize controllers with required use cases
const propertyController = new PropertyController(addPropertyUseCase);

const router = Router();

router.post('/add-property', upload ,(req, res, next) => propertyController.addProperty(req, res, next));

export default router;
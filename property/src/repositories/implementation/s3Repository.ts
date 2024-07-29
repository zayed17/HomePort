import { S3Interface } from '../../repositories';
import { S3Service } from '../../infrastructure';

export class S3Repository implements S3Interface {
    constructor(private s3Service: S3Service) {}
  
    async uploadImage(file: Express.Multer.File): Promise<string> {
      return this.s3Service.uploadImage(file);
    }
  }
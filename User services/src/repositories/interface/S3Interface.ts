import { Express } from 'express';

export  interface S3Interface {
  uploadImage(file: Express.Multer.File): Promise<string>;
}
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../config/s3config';
// import { S3Interface } from '../../domain/interfaces/S3Interface';

export class S3Service {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data.Location);
      });
    });
  }
}
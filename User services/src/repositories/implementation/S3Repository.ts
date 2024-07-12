import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {S3Interface} from '../interface';


dotenv.config();

export class S3Repository implements S3Interface {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    console.log(1)
    console.log(process.env.AWS_ACCESS_KEY_ID,"    d     ",process.env.AWS_SECRET_ACCESS_KEY,"       f"   ,process.env.AWS_BUCKET_NAME)
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read',
    };
console.log(12)
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err:any, data:any) => {
        if (err) {
          reject(err);
        }
        console.log(data,"data checking")
        resolve(data.Location);
      });
    });
  }
}


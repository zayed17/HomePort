import AWS from 'aws-sdk';
import { UploadFileInterface } from '../interface';
import { FileData } from '../../entities/FIleEntity';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export class UploadFileRepository implements UploadFileInterface {
  async uploadFile(buffer: Buffer, key: string, contentType: string): Promise<FileData> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    const data = await s3.upload(params).promise();

    return {
      url: data.Location,
      key: data.Key,
      contentType,
      size: buffer.length,
    };
  }
}
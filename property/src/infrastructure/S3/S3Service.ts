// import { v4 as uuidv4 } from 'uuid';
// import s3 from '../../config/s3config';
// // import { S3Interface } from '../../domain/interfaces/S3Interface';

// export class S3Service {
//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME!,
//       Key: `${uuidv4()}-${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     return new Promise((resolve, reject) => {
//       s3.upload(params, (err: any, data: any) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(data.Location);
//       });
//     });
//   }
// }


// import { v4 as uuidv4 } from 'uuid';
// import s3 from '../../config/s3config';

// export class S3Service {
//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME!,
//       Key: `${uuidv4()}-${file.originalname}`,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     return new Promise((resolve, reject) => {
//       s3.upload(params, (err: any, data: any) => {
//         if (err) {
//           console.error('S3 upload error:', err);
//           return reject(err);
//         }
//         if (!data || !data.Location) {
//           const errorMsg = 'S3 upload response missing Location';
//           console.error(errorMsg, data);
//           return reject(new Error(errorMsg));
//         }
//         resolve(data.Location);
//       });
//     });
//   }
// }


// src/services/propertyService.ts


// src/infrastructure/S3/S3Service.ts

// import s3 from '../../config/s3config';
// import dotenv from 'dotenv';
// dotenv.config();

// class PropertyService {
//   async generatePresignedUrls(files: Array<{ filename: string; fileType: string }>): Promise<string[]> {
//     try {
//       const urls = await Promise.all(
//         files.map(async ({ filename, fileType }) => {
//           const sanitizedFilename = encodeURIComponent(filename); // Sanitize the filename
//           const params = {
//             Bucket: 'newbucketforrealestate',
//             Key: sanitizedFilename,
//             Expires: 60 * 15, 
//             ContentType: fileType,
//             ACL: 'public-read', 
//           };

//           return s3.getSignedUrlPromise('putObject', params);
//         })
//       );

//       console.log(urls," chekcing in promsie")

//       return urls;
//     } catch (error) {
//       console.error('Error generating presigned URLs:', error);
//       throw new Error('Could not generate presigned URLs');
//     }
//   }

//   getPublicUrl(filename: string): string {
//     return `https://newbucketforrealestate.s3.amazonaws.com/${encodeURIComponent(filename)}`;
//   }
// }

// export default PropertyService;



// src/infrastructure/services/PropertyService.ts
import s3  from '../../config/s3config';

 class PropertyService  {
  private readonly bucketName = process.env.AWS_BUCKET_NAME || 'newbucketforrealestate';

  async generatePresignedUrls(files: any[]): Promise<any[]> {
    return await Promise.all(
      files.map(async ({ filename, fileType }) => {
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${filename.split('.').pop()}`;
        const params = {
          Bucket: this.bucketName,
          Key: uniqueFilename,
          Expires: 900,
          ContentType: fileType,
          ACL: 'public-read',
        };
        const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
        const publicUrl = `https://${this.bucketName}.s3.amazonaws.com/${encodeURIComponent(uniqueFilename)}`;
        return { presignedUrl, publicUrl };
      })
    );
  }
}

export default PropertyService
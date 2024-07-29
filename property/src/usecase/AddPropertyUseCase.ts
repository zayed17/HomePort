import { S3Interface ,PropertyInterface} from '../repositories';
import { Property } from '../entities/propertyEntity';

export class AddPropertyUseCase {
  constructor(
            private s3Repository: S3Interface,
            private propertyRepository: PropertyInterface) {}

  async addProperty(files: Express.Multer.File[], formData: any): Promise<Property> {
    console.log(files,"checking from usecase");
    
    const uploadPromises = files.map((file) => this.s3Repository.uploadImage(file));
    const uploadedFiles = await Promise.all(uploadPromises);
    const imageUrls = uploadedFiles.map((file) => file);

    const propertyData: Property = {
      ...formData,
      mediaFiles: imageUrls,
    };

    return this.propertyRepository.addProperty(propertyData);
  }
}
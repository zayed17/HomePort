import { S3Interface, PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class RepostPropertyUseCase {
  constructor(
    private s3Repository: S3Interface,
    private propertyRepository: PropertyInterface,
  ) { }

  async RepostProperty(files: Express.Multer.File[], formData: any): Promise<void> {
    console.log(files, "checking from usecase");

    const uploadPromises = files.map((file) => this.s3Repository.uploadImage(file));
    const uploadedFiles = await Promise.all(uploadPromises);
    const imageUrls = uploadedFiles.map((file) => file);


    const updatedMediaFiles = [...formData.mediaFiles, ...imageUrls];

    const propertyData: Property = {
      ...formData,
      mediaFiles: updatedMediaFiles,
      status:'pending'
    };

    await this.propertyRepository.updateProperty(formData._id, propertyData);
  }
}
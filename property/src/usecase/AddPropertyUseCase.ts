import { S3Interface, PropertyInterface,RabbitMQPublisherInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class AddPropertyUseCase {
  constructor(
    // private s3Repository: S3Interface,
    private propertyRepository: PropertyInterface,
    private rabbitMQPublisher: RabbitMQPublisherInterface
  ) { }

  async addProperty(files: Express.Multer.File[], formData: any,id:string): Promise<Property> {
    console.log(files, "checking from usecase");

    // const uploadPromises = files.map((file) => this.s3Repository.uploadImage(file));
    // const uploadedFiles = await Promise.all(uploadPromises);
    // const imageUrls = uploadedFiles.map((file) => file);
    formData.createdBy = id
    const propertyData: Property = {
      ...formData,
      // mediaFiles: imageUrls,
    };
    await this.rabbitMQPublisher.publish('user_updates', 'update', { id,count:1,change:'postedProperty' });
    return this.propertyRepository.addProperty(propertyData);
  }
}
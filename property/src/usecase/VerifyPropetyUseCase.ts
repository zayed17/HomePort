import { Property } from '../entities/propertyEntity';
import { PropertyInterface,NotificationInterface } from '../repositories';

export class VerifyPropertyUseCase {
  constructor(private propertyRepository: PropertyInterface,
              private notificationRepository : NotificationInterface) { }

  async verifyProperty(id: string): Promise<void> {
    console.log(id, "id checking")
    const property = await this.propertyRepository.findOne({ _id: id });
    console.log(property, "checking")
    if (!property) {
      throw new Error('Property not found');
    }
    const updatedProperty: Partial<Property> = {
      status: 'verified'
    };

    await this.propertyRepository.updateProperty(id, updatedProperty);
    await this.notificationRepository.sendNotification('propertyVerified', {status: 'verified'});
  }
}
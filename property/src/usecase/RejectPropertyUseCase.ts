import { Property } from '../entities/propertyEntity';
import { PropertyInterface ,NotificationInterface} from '../repositories';

export class RejectPropertyUseCase {
  constructor(private propertyRepository: PropertyInterface,
      private notificationRepository: NotificationInterface) { }

  async rejectProperty(id: string, reason: string): Promise<void> {
    console.log("rejected use case worked")
    const property = await this.propertyRepository.findOne({ _id: id });
    if (!property) {
      throw new Error('Property not found');
    }
    const updatedProperty: Partial<Property> = {
      status: 'rejected',
      reason: reason
    };

    await this.propertyRepository.updateProperty(id, updatedProperty);

  }
}
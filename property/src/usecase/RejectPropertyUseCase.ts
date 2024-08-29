import { Property } from '../entities/propertyEntity';
import { PropertyInterface ,NotificationInterface} from '../repositories';

export class RejectPropertyUseCase {
  constructor(private propertyRepository: PropertyInterface,
      private notificationRepository: NotificationInterface) { }

  async rejectProperty(id: string, reason: string): Promise<void> {
    const property = await this.propertyRepository.findOne({ _id: id });
    if (!property) {
      throw new Error('Property not found');
    }
    const updatedProperty: Partial<Property> = {
      status: 'rejected',
      reason: reason
    };

    await this.propertyRepository.updateProperty(id, updatedProperty);
    await this.notificationRepository.sendNotification('propertyRejected', { status: 'rejected' });
  }
}
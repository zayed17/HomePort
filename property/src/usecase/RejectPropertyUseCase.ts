import { Property } from '../entities/propertyEntity';
import { PropertyInterface } from '../repositories';

export class RejectPropertyUseCase {
  constructor(private propertyRepository: PropertyInterface) { }

  async rejectProperty(id: string, reason: string): Promise<void> {
    const property = await this.propertyRepository.findById(id);
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
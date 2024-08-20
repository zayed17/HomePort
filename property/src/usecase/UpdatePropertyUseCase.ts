import { Property } from '../entities/propertyEntity';
import { PropertyInterface } from '../repositories';

export class UpdatePropertyUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async Update(_id: string, count: number): Promise<void> {
        try {
            const existingProperty = await this.propertyRepository.findOne({ _id });

            if (!existingProperty) {
                throw new Error(`Property with ID ${_id} not found`);
            }

            const updatedCount = (existingProperty?.noOfReports || 0) + count;

            const updatedProperty: Partial<Property> = {
                noOfReports: updatedCount,
            };

            await this.propertyRepository.updateProperty(_id, updatedProperty);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
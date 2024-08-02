import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class FindAllPropertiesUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async FindAllProperties(createdBy: string): Promise<Property[]> {
        try {
            const properties = await this.propertyRepository.find({ createdBy });
            return properties;
        } catch (error) {
            throw new Error('Unable to retrieve properties');
        }
    }
}
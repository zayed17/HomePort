import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class FindPendingPropertyUseCase {
    constructor(private propertyRepository: PropertyInterface) { }
    async FindPendingProperty(status:string): Promise<Property[]> {
        const properties = await this.propertyRepository.findPendingProperties(status);
        return properties;
    }
}
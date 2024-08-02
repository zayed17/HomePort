import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class FindAdminPropertiesUseCase {
    constructor(private propertyRepository: PropertyInterface) { }
    async FindAdminProperties(): Promise<Property[]> {
        const property = await this.propertyRepository.find({});
        return property;
    }
}
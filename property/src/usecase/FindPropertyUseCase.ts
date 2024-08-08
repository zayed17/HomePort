import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class FindPropertyUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async findProperty(id: string): Promise<Property | null> {
        const property = await this.propertyRepository.findOneWithPopulation({ _id: id },'createdBy')
        return property;
    }
}
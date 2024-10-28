import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class FindAllPropertiesUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async FindAllProperties(createdBy: string,page:number,limit:number): Promise<any> {
        try {
            const {properties,total} = await this.propertyRepository.findWithPagination({ createdBy },page,limit);
            return {properties,total}
        } catch (error) {
            throw new Error('Unable to retrieve properties');
        }
    }
}
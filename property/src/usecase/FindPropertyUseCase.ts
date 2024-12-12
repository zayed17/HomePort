import { PropertyInterface,ReviewInterace } from '../repositories';


export class FindPropertyUseCase {
    constructor(private propertyRepository: PropertyInterface,
                private reviewRepository:ReviewInterace
    ) { }

    async findProperty(id: string): Promise<any | null> {
        const property = await this.propertyRepository.findOneWithPopulation({ _id: id },'createdBy')

        const reviews = await this.reviewRepository.findByPropertyId(id);
        return {
            ...property,
            reviews,
          };
    }
}
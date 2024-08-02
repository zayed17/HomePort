import { Property } from '../entities/propertyEntity';
import { PropertyInterface } from '../repositories';

export class BlockUnblockUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async BlockUnblock(_id:string,newStatus:boolean): Promise<void> {  
        try {
            console.log(newStatus,"current status")
            const updatedProperty: Partial<Property> = {
                isBlock: newStatus
              };
             await this.propertyRepository.updateProperty(_id,updatedProperty);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}


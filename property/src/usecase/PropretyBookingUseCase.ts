import { Property } from '../entities/propertyEntity';
import { PropertyInterface } from '../repositories';

export class PropertyBookingUseCase {
    constructor(private propertyRepository: PropertyInterface) {}

    async update(propertyId: string, userId: string, bookingDate: Date, name: string,amountPaid:number,bookingId:string): Promise<void> {
        console.log(amountPaid,"checking frpm uscesa ",typeof(amountPaid))
        try {
            const existingProperty = await this.propertyRepository.findOne({ _id: propertyId });

            if (!existingProperty) {
                throw new Error(`Property with ID ${propertyId} not found`);
            }

            existingProperty?.bookedDetails?.push({ userId, bookingDate, userName: name,amountPaid ,_id:bookingId});

            const updatedProperty: Partial<Property> = {
                bookedDetails: existingProperty.bookedDetails,
            };

            await this.propertyRepository.updateProperty(propertyId, updatedProperty);
        } catch (error: any) {
            console.error('Error updating property:', error.message);
            throw new Error(`Failed to update property: ${error.message}`);
        }
    }
}
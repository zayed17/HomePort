import { Property } from '../entities/propertyEntity';
import { PropertyInterface } from '../repositories';
import mongoose from 'mongoose';

export class PropertyBookedUseCase {
    constructor(private propertyRepository: PropertyInterface) {}

    async update(propertyId: string, status: string,bookedId:string): Promise<void> {
        try {
console.log(propertyId,typeof(propertyId),bookedId)
            const existingProperty = await this.propertyRepository.findOne({ _id: propertyId });

            if (!existingProperty) {
                throw new Error(`Property with ID ${propertyId} not found`);
            }
console.log(existingProperty.bookedDetails)
            const filteredBookedDetails = existingProperty.bookedDetails?.filter(
                (booking) => booking._id.toString() === bookedId
            );

            console.log(filteredBookedDetails)

            const updateData: Partial<Property> = {
                status: status,
                bookedDetails: filteredBookedDetails 
            };
         
            await this.propertyRepository.updateProperty( propertyId , updateData);


            console.log('Property booked successfull and remove successfully');
        } catch (error: any) {
            console.error('Error updating property:', error.message);
            throw new Error(`Failed to update property: ${error.message}`);
        }
    }
}
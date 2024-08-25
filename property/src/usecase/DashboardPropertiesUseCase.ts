import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class DashboardPropertiesUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async FindAllProperties(createdBy: string): Promise<any> {
        try {
            const properties = await this.propertyRepository.find({ createdBy });

            const countBookedProperties = properties.filter(property => property.status==='booked').length;

            const totalRevenueFromSale = properties
                .filter(property => property.lookingFor === 'sell' && property.status==="booked")
                .reduce((acc, property) => acc + (property.sellPrice || 0), 0);

            // Calculate total revenue from rental properties
            // const totalRevenueFromRent = properties
            //     .filter(property => property.lookingFor === 'rent' && property.rentAmount > 0)
            //     .reduce((acc, property) => {
            //         const startDate = new Date(property.rentalPeriod.startDate);
            //         const endDate = new Date(property.rentalPeriod.endDate);
            //         const months = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
            //         return acc + (property.rentAmount * months);
            //     }, 0);

            // Calculate booked properties per month
            const bookingsByMonth: { [key: string]: number } = {};
            properties
                .filter(property => property.status=='booked')
                .forEach(property => {
                    const month = new Date(property.updatedAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                    if (!bookingsByMonth[month]) {
                        bookingsByMonth[month] = 0;
                    }
                    bookingsByMonth[month]++;
                });
console.log(bookingsByMonth,"chjec")
            return {
                properties,
                countBookedProperties,
                totalRevenueFromSale,
                // totalRevenueFromRent,
                bookingsByMonth
            };

        } catch (error) {
            throw new Error('Unable to retrieve properties');
        }
    }
}
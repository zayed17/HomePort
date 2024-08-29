import { PropertyInterface } from '../repositories';

export class DashboardPropertiesUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async FindAllProperties(createdBy: string): Promise<any> {
        try {
            const properties = await this.propertyRepository.find({ createdBy });

            const countBookedProperties = properties.filter(property => property.status === 'booked').length;

            const revenueByMonth: { [key: string]: number } = {};
            properties
                .filter(property => property.lookingFor === 'sell' && property.status === "booked")
                .forEach(property => {
                    const month = new Date(property.updatedAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                    if (!revenueByMonth[month]) {
                        revenueByMonth[month] = 0;
                    }
                    revenueByMonth[month] += property.sellPrice || 0;
                });

            console.log(revenueByMonth, "checking");

            const bookingsByMonth: { [key: string]: number } = {};
            properties.filter(property => property.status === 'booked')
                .forEach(property => {
                    const month = new Date(property.updatedAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                    if (!bookingsByMonth[month]) {
                        bookingsByMonth[month] = 0;
                    }
                    bookingsByMonth[month]++;
                });
            
            console.log(bookingsByMonth, "checking");

            return {
                properties,
                countBookedProperties,
                revenueByMonth, 
                bookingsByMonth
            };

        } catch (error) {
            throw new Error('Unable to retrieve properties');
        }
    }
}
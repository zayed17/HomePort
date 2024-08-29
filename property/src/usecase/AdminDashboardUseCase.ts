import { PropertyInterface } from '../repositories';
import { Property } from '../entities/propertyEntity';

export class AdminDashboardUseCase {
    constructor(private propertyRepository: PropertyInterface) { }

    async AdminDashboard(): Promise<{ properties: Property[], monthlyRevenue: { [key: string]: number } }> {
        const properties = await this.propertyRepository.find({});
        const monthlyRevenue: { [key: string]: number } = {};

        properties.forEach(property => {
            const month = new Date(property.updatedAt).toLocaleString('default', { month: 'short', year: 'numeric' });

            if (!monthlyRevenue[month]) {
                monthlyRevenue[month] = 0;
            }

            if ((property.lookingFor === 'sell' || property.lookingFor === 'rent') && property.status === 'booked') {
                monthlyRevenue[month] += 5000;
            }

            if (property.sponsorship?.isSponsored) {
                monthlyRevenue[month] += property.sponsorship.details?.amount || 0;
            }
        });
        console.log(monthlyRevenue,"checking")

        return { properties, monthlyRevenue };
    }
}
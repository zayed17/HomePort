import { SubscriptionData } from '../entities/subscriptionEntity';
import { SubscriptionInterface } from '../repositories/interface/subscriptionInterface';


export class AddSubscriptionUseCase {
    constructor(private subscriptionRepository: SubscriptionInterface) { }

    async addSubscription(formData: SubscriptionData): Promise<void> {
        await this.subscriptionRepository.save(formData);
    }
}
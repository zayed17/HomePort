import { SubscriptionData } from '../entities/subscriptionEntity';
import { SubscriptionInterface } from '../repositories/interface/subscriptionInterface';


export class FindAllSubscriptionUseCase {
    constructor(private subscriptionRepository: SubscriptionInterface) { }

    async findAllSubscription(): Promise<SubscriptionData[]> {
       return await this.subscriptionRepository.find();
    }
}
import { SubscriptionData } from '../../entities/subscriptionEntity';
import { SubscriptionInterface } from '../interface/subscriptionInterface';
import SubscriptionModel from '../../infrastructure/mongoDB/models/subscriptionModel';

export class SubscriptionRepository implements SubscriptionInterface {
    async save(subscription: SubscriptionData): Promise<void> {
        const newSubscription = new SubscriptionModel(subscription);
        await newSubscription.save();
    }  

    async find(filter: Partial<SubscriptionData> = {}): Promise<SubscriptionData[]> {
        return SubscriptionModel.find(filter) as any
      }
}

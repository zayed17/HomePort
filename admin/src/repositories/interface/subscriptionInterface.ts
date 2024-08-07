import { SubscriptionData } from '../../entities/subscriptionEntity';

export interface SubscriptionInterface {
    save(subscription: SubscriptionData): Promise<void>;
    find(filter?: Partial<SubscriptionData>): Promise<SubscriptionData[]>;
}

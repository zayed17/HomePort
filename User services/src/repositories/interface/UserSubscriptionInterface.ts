import { SubscriptionData } from '../../entities';

export interface UserSubscriptionInterface {
    findOne(filter: any): Promise<SubscriptionData | null>;
    update(userId: string, subscriptionData: Partial<SubscriptionData>): Promise<void>;
}

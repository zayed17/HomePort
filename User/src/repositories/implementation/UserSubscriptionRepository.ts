import { UserSubscriptionInterface } from '../interface';
import { SubscriptionData } from '../../entities';
import SubscriptionModel from '../../infrastructure/database/models/SubscriptionModel';

export class UserSubscriptionRepository implements UserSubscriptionInterface {

  async update(userId: string, userSubscription: Partial<SubscriptionData>): Promise<void> {
    await SubscriptionModel.updateOne({ userId }, { $set: userSubscription })
  }

  async findOne(filter: any): Promise<SubscriptionData | null> {
    return SubscriptionModel.findOne(filter)
  }


}
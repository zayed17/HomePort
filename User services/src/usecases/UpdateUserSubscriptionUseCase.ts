import { UserInterface } from '../repositories/interface';

export class UpdateUserSubscriptionUsecase {
    constructor(private userRepository: UserInterface) {}

    async update(_id: string, count: number, change: 'postedProperty' | 'sponsoredPosted'): Promise<void> {
        const user = await this.userRepository.findOne({_id });
        if (!user) {
            throw new Error("User not found");
        }

        if (!['postedProperty', 'sponsoredPosted'].includes(change)) {
            throw new Error("Invalid field to update");
        }

        user[change] += count;

        await this.userRepository.update({ _id }, { [change]: user[change] });
    }
}
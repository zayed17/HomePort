import { UserPropertyInterface } from '../repositories';

interface ToggleFavoriteInput {
    propertyId: string;
    userId: string;
    action: 'add' | 'remove';
}

export class ToggleFavouriteUseCaseUseCase {
    constructor(private userPropertyInterface: UserPropertyInterface) { }

    async toggleFavourite({ propertyId, userId, action }: ToggleFavoriteInput) {
        const user = await this.userPropertyInterface.findUser({ _id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        if (action === 'add' && !user.favourites.includes(propertyId)) {
            user.favourites.push(propertyId);
        } else if (action === 'remove') {
            user.favourites = user.favourites.filter((id: string) => id.toString() !== propertyId.toString());
        }
        await this.userPropertyInterface.updateUser(userId, { favourites: user.favourites });
    }
}
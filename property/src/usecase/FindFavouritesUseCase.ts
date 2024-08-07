import { UserPropertyInterface } from '../repositories';

export class FindFavouritesUseCase {
  constructor(
    private userPropertyInterface: UserPropertyInterface
  ) {}

  async findFavourites(_id: string): Promise<any> {
    try {
      console.log(_id,"userId")
      const properties = await this.userPropertyInterface.findUserFavorites(_id)
      console.log(properties,"checking")
      return properties
    } catch (error) {
      throw new Error('Failed to fetch favourites ');
    }
  }
}
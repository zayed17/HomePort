import { UserPropertyInterface } from '../repositories';
import { UserData } from '../entities/userPropertyEntity';

export class AddUserUseCase {
  constructor(
    private userPropertyInterface: UserPropertyInterface
  ) {}

  async addUser(user: any): Promise<void> {
    try {
      const userData: UserData = {
        _id:user.id,
        name: user.firstName,
        email: user.email,
        phone: user.phone,
        favourites: [] 
      };
      await this.userPropertyInterface.addUser(userData);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }
}
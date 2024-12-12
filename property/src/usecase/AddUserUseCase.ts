import mongoose from 'mongoose'; 
import { UserPropertyInterface } from '../repositories';
import { UserData } from '../entities/userPropertyEntity';

export class AddUserUseCase {
  constructor(
    private userPropertyInterface: UserPropertyInterface
  ) {}

  async addUser(user: any): Promise<void> {
    try {
      console.log(user,"user data consoling")
      const userData: UserData = {
        _id: new mongoose.Types.ObjectId(user._id), 
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
        imageUrl: user.image ? user.image:''
      };
      await this.userPropertyInterface.addUser(userData);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }
}
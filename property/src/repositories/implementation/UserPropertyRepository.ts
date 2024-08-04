import { UserPropertyInterface } from '../interface';
import { UserData } from '../../entities/userPropertyEntity';
import UserModel from '../../infrastructure/mongodb/UserPropertyModel';

export class UserPropertyRepository implements UserPropertyInterface {

  async addUser(user: UserData): Promise<any> {
    const newProperty = new UserModel(user);
    return  newProperty.save();
  }

  async findUser(filter: any): Promise<UserData | null> {
    return UserModel.findOne(filter).lean();
  }


  async updateUser(_id: string, user: Partial<UserData>): Promise<void> {
    await UserModel.updateOne({ _id }, { $set: user })
  }
}
import { User } from '../../entities';
import { UserInterface } from '../interface';
import UserModel from '../../infrastructure/database/models/UserModel';

export class UserRepository implements UserInterface {
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            return null;
        }
        return new User(user);
    }

    async save(user: User): Promise<void> {
        const newUser = new UserModel(user);
        await newUser.save();
    }

    async update(email: string, updateData: Partial<User>): Promise<void> {
        await UserModel.updateOne({ email }, { $set: updateData }).exec(); 
    }

}

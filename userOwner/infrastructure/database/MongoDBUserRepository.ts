import { User } from '../../entities/userEntity';
import { UserRepository } from '../../repositories/UserRepository';
import UserModel from './models/UserModel';

export class MongooseUserRepository implements UserRepository {
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

}

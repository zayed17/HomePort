import { User } from '../../entities';
import { UserInterface } from '../interface';
import UserModel from '../../infrastructure/database/models/UserModel';

export class UserRepository implements UserInterface {
    async findOne(filter: any): Promise<User | null> {
        return UserModel.findOne(filter).lean();
    }

    async findOneWithPopulation(filter: any,populate:string): Promise<any | null> {
        return UserModel.findOne(filter).populate(populate)
      }
    

    async save(user: User): Promise<void> {
        const newUser = new UserModel(user);
        await newUser.save();
    }

    async update(identifier: { email?: string; _id?: string }, updateData: Partial<User>): Promise<void> {
        if (identifier.email) {
            await UserModel.updateOne({ email: identifier.email }, { $set: updateData }).exec();
        } else if (identifier._id) {
            await UserModel.updateOne({ _id: identifier._id }, { $set: updateData }).exec();
        } else {
            throw new Error("Invalid identifier for updating user");
        }
    }
    
    async findAll(): Promise<User[]> {
        return await UserModel.find()
    }

    async findAllWithPopulation(populate:string): Promise<any> {
        return UserModel.find().populate(populate).exec()
      }
    
}

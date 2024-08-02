import { User } from '../../entities';

export interface UserInterface {
    findOne(filter: any): Promise<User | null>;
    save(user: User): Promise<void>;
    update(identifier: { email?: string; _id?: string }, updateData: Partial<User>): Promise<void>;
    findAll(): Promise<User[]>; 
}

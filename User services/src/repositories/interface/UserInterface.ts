import { User } from '../../entities';

export interface UserInterface {
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(identifier: { email?: string; _id?: string }, updateData: Partial<User>): Promise<void>;
    findAll(): Promise<User[]>; 
}

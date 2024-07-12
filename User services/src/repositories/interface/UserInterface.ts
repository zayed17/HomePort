import { User } from '../../entities';

export interface UserInterface {
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(email: string, updateData: Partial<User>): Promise<void>; 
}

import { User } from '../../entities';

export interface UserInterface {
    findOne(filter: any): Promise<User | null>;
    save(user: Partial<User>): Promise<void>;
    update(identifier: { email?: string; _id?: string }, updateData: Partial<User>): Promise<void>;
    findAll(): Promise<User[]>; 
    findOneWithPopulation(filter: any,populate:string): Promise<User | null>;
}
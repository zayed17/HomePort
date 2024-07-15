import { UserInterface } from '../repositories/interface';
import { User } from '../entities';

export class FindAllUserUseCase {
    constructor(private userRepository: UserInterface) { }

    async FindAllUsers(): Promise<User[]> {  
        try {
            const users = await this.userRepository.findAll();
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
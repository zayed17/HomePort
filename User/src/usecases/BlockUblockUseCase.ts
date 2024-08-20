import { UserInterface } from '../repositories/interface';

export class BlockUnblockUseCase {
    constructor(private userRepository: UserInterface) { }

    async BlockUnblock(_id:string,newStatus:boolean): Promise<void> {  
        try {
             await this.userRepository.update({_id},{active:newStatus});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
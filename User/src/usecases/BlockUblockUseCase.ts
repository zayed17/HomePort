import { UserInterface ,NotificationInterface} from '../repositories/interface';

export class BlockUnblockUseCase {
    constructor(private userRepository: UserInterface,
        private  notificationRepository:NotificationInterface
    ) { }

    async BlockUnblock(_id:string,newStatus:boolean): Promise<void> {  
        try {
            if(!newStatus){
                await this.notificationRepository.sendNotification('adminBlocked',{status:true});
            }
             await this.userRepository.update({_id},{active:newStatus});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
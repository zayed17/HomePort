import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface getDetailParams{
    id:string;
}

export class GetUserDetailUsecase{
    constructor(private userRepository : UserInterface){}
    async getDetail(params:getDetailParams): Promise<User> {
        const id = params;
        const user = await this.userRepository.findOneWithPopulation({_id:id},'subscriptionId')
        console.log(user,"gets")
        if(!user){
            throw new Error("user not found")
        }
        return user
    }
}
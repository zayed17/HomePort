import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface getDetailParams{
    id:string;
}

export class GetSingleUserUsecase{
    constructor(private userRepository : UserInterface){}
    async getDetail(params:getDetailParams): Promise<User> {
        const id = params;
        const user = await this.userRepository.findOne({_id:id})
        console.log(user,"gets")
        if(!user){
            throw new Error("user not found")
        }
        return user
    }
}
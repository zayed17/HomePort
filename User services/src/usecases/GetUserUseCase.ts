import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface getDetailParams{
    _id:string;
}

export class GetUserDetailUsecase{
    constructor(private userRepository : UserInterface){}
    async getDetail(params:getDetailParams): Promise<User> {
        const {_id} = params;
        const user = await this.userRepository.findOne({_id})
        if(!user){
            throw new Error("user not found")
        }
        return user
    }
}
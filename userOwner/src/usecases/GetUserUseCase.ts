import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface getDetailParams{
    email:string;
}

export class GetUserDetail{
    constructor(private userRepository : UserInterface){}
    async getDetail(params:getDetailParams): Promise<User> {
        const {email} = params;
        console.log(1,2,email)
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        return user
    }
}
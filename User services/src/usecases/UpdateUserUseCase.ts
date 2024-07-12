import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface EditParams{
    firstName:string;
    lastName:string;
    phone:string;
    email:string;
}

export class UpdateUsecase{
    constructor(private userRepository : UserInterface){}
    async update(params:EditParams): Promise<User> {
        const {lastName,firstName,phone,email} = params;
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        await this.userRepository.update(email, {lastName,firstName,phone}); 
        return user
    }
}
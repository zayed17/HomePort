import { User } from '../entities';
import {UserRepository} from '../repositories'

interface LoginParams{
    email:string;
    password:string;
}

export class LoginUseCase{
    constructor(private userRepository : UserRepository){}
    async excute(params:LoginParams): Promise<User | null> {
        const {email,password} = params;
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if (user.password !== password) {
            throw new Error('Incorrect password');
        }
        return user
    }
}
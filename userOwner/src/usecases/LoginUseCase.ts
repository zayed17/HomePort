import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface LoginParams{
    email:string;
    password:string;
}

export class LoginUseCase{
    constructor(private userRepository : UserInterface){}
    async execute(params:LoginParams): Promise<User | null> {
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
import {  generateToken ,generateRefreshToken} from 'homepackage';

import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface LoginParams{
    email:string;
    password:string;
    role:string
}


export class LoginUseCase{
    constructor(private userRepository : UserInterface){}
    async execute(params:LoginParams): Promise<{user:User,token:string,refresh:string}> {
        const {email,password,role} = params;
        const user = await this.userRepository.findOne({email})
        if(!user){
            throw new Error("user not found")
        }
        if(!user.roles.includes(role)){
            throw new Error('Access denied for the specified role');
        }
        if(!user.active){
            throw new Error('Your Account is Blocked');
        }
        if (user.password !== password) {
            throw new Error('Incorrect password');      
        }
        const token = generateToken({_id:user._id,role:user.roles})
        const refresh = generateRefreshToken({_id:user._id,role:user.roles})

        return {user,token,refresh}
    }
}
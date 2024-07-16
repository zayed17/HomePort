import { generateToken } from '../../../HomePackage/src';
import { User } from '../entities';
import {UserInterface} from '../repositories/interface'

interface LoginParams{
    email:string;
    password:string;
    role:string
}


export class LoginUseCase{
    constructor(private userRepository : UserInterface){}
    async execute(params:LoginParams): Promise<{user:User,token:string}> {
        const {email,password,role} = params;
        const user = await this.userRepository.findByEmail(email)
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
        const token = generateToken({email:user.email,role:user.roles})

        return {user,token}
    }
}
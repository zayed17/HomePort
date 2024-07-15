import { UserInterface } from '../repositories/interface';

export class ForgotPasswordUseCase {
    constructor(private userRepository: UserInterface) {}
    async ForgotPassword(email: string,password:string): Promise<void> {
        console.log(password,"checking")
       try {
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new Error("User not found")
        }
        await this.userRepository.update({email}, {password}); 
       } catch (error:any) {
        throw new Error(error.message)
       }
    }
}
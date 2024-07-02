import { UserInterface ,RedisOtpInterface } from '../repositories/interface'

export class OTPVerificationUseCase{
    constructor(
        private otpService:RedisOtpInterface,
        private userRepository:UserInterface
    ){}
    async VerifyOtp(email:string,otp:string,):Promise<void>{
        const storeOtp = await this.otpService.retrieveOTP(email);

        if(!storeOtp || storeOtp != otp){
            throw new Error("Invalid email or otp")
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        user.active = true;
        await this.userRepository.update(email, { active: true }); 
        await this.otpService.deleteOTP(email);
    }
}
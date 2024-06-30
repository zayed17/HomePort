import { RedisOTPService } from "../infrastructure/redis/redisClient"
import { UserRepository } from "../repositories"

export class OTPVerificationUseCase{
    constructor(
        private otpService:RedisOTPService,
        private userRepository:UserRepository
    ){}
    async VerifyOtp(email:string,otp:string,):Promise<void>{
        console.log(email,otp,"checking user input ")
        const storeOtp = await this.otpService.retrieveOTP(email);
        console.log(storeOtp,typeof(storeOtp),"getting or not ")
        console.log(storeOtp==otp,"checking otp is correct or not in OTPUsecase")

        if(!storeOtp || storeOtp != otp){
            throw new Error("Invalid email or otp")
        }
        const user = await this.userRepository.findByEmail(email);
        console.log(user,"user is getting or not in OTPUsecase")
        if (!user) {
            throw new Error('User not found');
        }
        console.log(1)
        await this.userRepository.update(email, { active: true }); 
        console.log(2)
        await this.otpService.deleteOTP(email);
        console.log(3)
    }
}
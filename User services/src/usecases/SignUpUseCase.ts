import { User } from '../entities';
import { UserInterface, RedisOtpInterface, EmailInterface } from '../repositories/interface';



export class SignUpUseCase {
    constructor(
        private userRepository: UserInterface,
        private otpService: RedisOtpInterface,
        private emailService: EmailInterface
    ) { }

    async execute(formData:Partial<User>): Promise<void> {
        const email = formData.email!
        const existingUser = await this.userRepository.findOne({email});

        if (existingUser) {
            if (existingUser.active) {
                console.log("first")
                throw new Error("Email already exists");
            } else {
                console.log("second")
                const otp = this.emailService.generateOTP();
                await this.otpService.storeOTP(email, otp);
                await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
                return 
            }
        }

        await this.userRepository.save(formData);
        const otp = this.emailService.generateOTP();
        await this.otpService.storeOTP(email, otp);
        await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);

    }
}
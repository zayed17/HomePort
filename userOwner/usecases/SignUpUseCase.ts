import { User } from '../entities';
import { EmailService } from '../infrastructure/email/emailService';
import { RedisOTPService } from '../infrastructure/redis/redisClient';
import { UserRepository } from '../repositories';
import { generateOTP } from '../utils/otpGenerator';

interface SignUpParams {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
}

export class SignUpUseCase {
    constructor(private userRepository: UserRepository,
                private otpService: RedisOTPService,
                private emailServic:EmailService
    ) {}

    async execute(params: SignUpParams): Promise<User> {
        if (!params.firstName || !params.lastName || !params.email || !params.phone || !params.password) {
            throw new Error('Missing required fields');
        }

        const existingUser = await this.userRepository.findByEmail(params.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const otp = generateOTP();
        console.log(otp,"From signuse")
        await this.otpService.storeOTP(params.email!,otp)


        const newUser = new User({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            phone: params.phone,
            password: params.password,
            active:false
        });

        // await this.userRepository.save(newUser);
        await this.emailServic.sendEmail(params.email!,"OTP Verification",`Your OTP is ${otp}`)

        return newUser;
    }
}

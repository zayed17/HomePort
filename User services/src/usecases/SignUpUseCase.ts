import { User } from '../entities';
import { UserInterface, RedisOtpInterface,EmailInterface } from '../repositories/interface';

interface SignUpParams {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

export class SignUpUseCase {
    constructor(
        private userRepository: UserInterface,
        private otpService: RedisOtpInterface,
        private emailService: EmailInterface
    ) {}

    async execute({ firstName, lastName, email, phone, password, role }: SignUpParams): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            if (existingUser.roles.includes(role)) {
                throw new Error('Email already exists with this role');
            } else {
                existingUser.roles.push(role);
                await this.userRepository.update({email:existingUser.email}, { roles: existingUser.roles });
                return existingUser;
            }
        }
        const otp = this.emailService.generateOTP()
        await this.otpService.storeOTP(email, otp);
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            image:null,
            active: false,
            roles: [role] 
        });
        await this.userRepository.save(newUser);
        await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
        return newUser;
    }
}

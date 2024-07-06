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
                await this.userRepository.update(existingUser.email, { roles: existingUser.roles });
                return existingUser;
            }
        }

        const otp = this.emailService.generateOTP()
        console.log(otp, "Generated OTP");
        await this.otpService.storeOTP(email, otp);
        console.log("OTP stored in Redis");

        console.log(1)
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            active: false,
            roles: [role] 
        });
console.log(2)
        await this.userRepository.save(newUser);
        console.log(3)
        await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
console.log(3)
        return newUser;
    }
}

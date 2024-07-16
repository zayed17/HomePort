// import { User } from '../entities';
// import { UserInterface, RedisOtpInterface, EmailInterface } from '../repositories/interface';

// interface SignUpParams {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;
//     role: string;
// }

// export class SignUpUseCase {
//     constructor(
//         private userRepository: UserInterface,
//         private otpService: RedisOtpInterface,
//         private emailService: EmailInterface
//     ) { }

//     async execute({ firstName, lastName, email, phone, password, role }: SignUpParams): Promise<User> {
//         const existingUser = await this.userRepository.findByEmail(email);
//         if (existingUser && !existingUser.active) {
           
//         }
//         const otp = this.emailService.generateOTP()
//         await this.otpService.storeOTP(email, otp);
//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             phone,
//             password,
//             image: null,
//             active: false,
//             roles: [role]
//         });
//         await this.userRepository.save(newUser);
//         await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
//         return newUser;
//     }
// }

import { User } from '../entities';
import { UserInterface, RedisOtpInterface, EmailInterface } from '../repositories/interface';

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
    ) { }

    async execute({ firstName, lastName, email, phone, password, role }: SignUpParams): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            if (existingUser.active) {
                console.log("first")
                throw new Error("Email already exists");
            } else {
                console.log("second")
                const otp = this.emailService.generateOTP();
                await this.otpService.storeOTP(email, otp);
                await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
                return existingUser;
            }
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            image: null,
            active: false,
            roles: [role]
        });

        await this.userRepository.save(newUser);
        const otp = this.emailService.generateOTP();
        await this.otpService.storeOTP(email, otp);
        await this.emailService.sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
        return newUser;
    }
}
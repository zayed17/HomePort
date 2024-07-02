// import express, { Request, Response, NextFunction } from 'express';
// import { MongooseUserRepository } from '../../../../repositories/implementation/MongoDBUserRepository';
// import { SignUpUseCase,LoginUseCase,OTPVerificationUseCase } from '../../../../usecases';
// import { RedisOTPService } from '../../../../infrastructure/redis/redisClient';
// import { EmailService } from '../../../../infrastructure/email/emailService';
// import { generateAuthToken,setAuthTokenCookie } from '../../../../services';
// import dontenv from 'dotenv'
// dontenv.config()

// const userRepository = new MongooseUserRepository();
// const otpService = new RedisOTPService()
// const emailService = new EmailService()

// const loginUseCase = new LoginUseCase(userRepository);
// const signUpUseCase = new SignUpUseCase(userRepository,otpService,emailService);
// const otpVerificationUseCase = new OTPVerificationUseCase(otpService,userRepository)

// export const signUpUser = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
//     console.log("req.body on controller",req.body)
//     const { firstName, lastName, email, phone, password ,role} = req.body;

//     try {
//         const newUser = await signUpUseCase.execute({ firstName, lastName, email, phone, password ,role});
//         const token = generateAuthToken({ email: newUser.email }); 
//         setAuthTokenCookie(res, token);
//         res.status(201).json(newUser);
//     } catch (error) {
//         next(error); 
//     }
// };

// export const loginUser = async (req:Request,res:Response,next:NextFunction): Promise<void> =>{
//     console.log(req.body,"req.body in login")
//     const {email,password} = req.body
//     try {
//         const user = await loginUseCase.excute({email,password})
//         res.status(200).json({ message: 'User successfully logged in',user,});
//     } catch (error) {
//         next(error)
//     }
// }
// export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
//     const { email, otp } = req.body;
//     console.log(req.body,"from verifyOtp ")
//     try {
//         await otpVerificationUseCase.VerifyOtp(email, otp);
//         // const token = generateAuthToken({ email }); 
//         // setAuthTokenCookie(res, token); 
//         res.status(200).json({
//             message: 'OTP verified successfully',
//         });
//     } catch (error) {
//         res.status(400).json({ message: "something happend"});
//     }
// };


import { Request, Response, NextFunction } from 'express';
import { SignUpUseCase,LoginUseCase,OTPVerificationUseCase } from '../../../../usecases';
import { generateAuthToken,setAuthTokenCookie } from '../../../../services';


export class UserController {
    constructor(
        private signUpUseCase: SignUpUseCase,
        private loginUseCase: LoginUseCase,
        private otpVerificationUseCase: OTPVerificationUseCase
    ) {}

    async signUpUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("req.body on controller", req.body);
        const { firstName, lastName, email, phone, password, role } = req.body;

        try {
            const newUser = await this.signUpUseCase.execute({ firstName, lastName, email, phone, password, role });
            const token = generateAuthToken({ email: newUser.email }); 
            setAuthTokenCookie(res, token);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "req.body in login");
        const { email, password } = req.body;
        try {
            const user = await this.loginUseCase.execute({ email, password });
            res.status(200).json({ message: 'User successfully logged in', user });
        } catch (error) {
            next(error);
        }
    }

    async verifyOTP(req: Request, res: Response): Promise<void> {
        const { email, otp } = req.body;
        console.log(req.body, "from verifyOtp");
        try {
            await this.otpVerificationUseCase.VerifyOtp( email, otp );
            res.status(200).json({
                message: 'OTP verified successfully',
            });
        } catch (error) {
            res.status(400).json({ message: "Something happened" });
        }
    }
}

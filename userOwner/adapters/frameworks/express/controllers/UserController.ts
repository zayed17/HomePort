import { Request, Response } from 'express';
import { MongooseUserRepository } from '../../../../infrastructure/database/MongoDBUserRepository';
import { SignUpUseCase,LoginUseCase,OTPVerificationUseCase } from '../../../../usecases';
import { RedisOTPService } from '../../../../infrastructure/redis/redisClient';
import { EmailService } from '../../../../infrastructure/email/emailService';

const userRepository = new MongooseUserRepository();
const otpService = new RedisOTPService()
const emailService = new EmailService()

const loginUseCase = new LoginUseCase(userRepository);
const signUpUseCase = new SignUpUseCase(userRepository,otpService,emailService);
const otpVerificationUseCase = new OTPVerificationUseCase(otpService,userRepository)

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    console.log("req.body on controller",req.body)
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        const newUser = await signUpUseCase.execute({ firstName, lastName, email, phone, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Unexpected Happened" });
    }
};

export const loginUser = async (req:Request,res:Response): Promise<void> =>{
    console.log(req.body,"req.body in login")
    const {email,password} = req.body
    try {
        const user = await loginUseCase.excute({email,password})
        res.status(200).json({ message: 'User successfully logged in',user,});
    } catch (error) {
        res.status(400).json({ message: "Unexpected Happened" });
    }
}
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    console.log(req.body,"from verifyOtp ")
    try {
        await otpVerificationUseCase.VerifyOtp(email, otp);
        res.status(200).json({
            message: 'OTP verified successfully',
        });
    } catch (error) {
        res.status(400).json({ message: "something happend"});
    }
};
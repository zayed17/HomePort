import { Request, Response, NextFunction } from 'express';
import { SignUpUseCase,LoginUseCase,OTPVerificationUseCase,GetUserDetail } from '../../../../usecases';


export class UserController {
    constructor(
        private signUpUseCase: SignUpUseCase,
        private loginUseCase: LoginUseCase,
        private otpVerificationUseCase: OTPVerificationUseCase,
        private getUserDetailUseCase: GetUserDetail,
    ) {}

    async signUpUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("req.body on controller", req.body);
        const { firstName, lastName, email, phone, password, role } = req.body;

        try {
            const newUser = await this.signUpUseCase.execute({ firstName, lastName, email, phone, password, role });
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "req.body in login");
        const { email, password } = req.body;
        try {
            const {user,token} = await this.loginUseCase.execute({ email, password });
            res.status(200).json({ message: 'User successfully logged in', user,token });
        } catch (error) {
            next(error);
        }
    }

    async verifyOTP(req: Request, res: Response): Promise<void> {
        const { email, otp } = req.body;
        console.log(req.body, "from verifyOtp");
        try {
           const {token,user} =  await this.otpVerificationUseCase.VerifyOtp( email, otp );
            res.status(200).json({ message: 'OTP verified successfully',token,user});
        } catch (error) {
            res.status(400).json({ message: "Something happened" });
        }
    }

    async getUser(req: any, res: Response): Promise<void> {
        const userEmail = req.user
        console.log(userEmail);
        try {
            const userDetails = await this.getUserDetailUseCase.getDetail(userEmail)
            res.status(200).json({ message: 'success',userDetails});
        } catch (error) {
            res.status(400).json({ message: "Something happened" });
        }
    }
}

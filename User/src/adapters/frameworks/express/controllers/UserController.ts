import { Request, Response, NextFunction } from 'express';
import { SignUpUseCase, LoginUseCase, OTPVerificationUseCase, GetUserDetailUsecase, UpdateUsecase, UploadImageUseCase, ResendOTPUseCase, GoogleAuthUseCase, VerifyEmailUseCase, ForgotPasswordUseCase, ChangePasswordUseCase, FindAllUserUseCase, BlockUnblockUseCase,PublishUserUpdateUseCase ,UserAdminDashboardUseCase} from '../../../../usecases';


export class UserController {
    constructor(
        private signUpUseCase: SignUpUseCase,
        private loginUseCase: LoginUseCase,
        private otpVerificationUseCase: OTPVerificationUseCase,
        private getUserDetailUseCase: GetUserDetailUsecase,
        private updateUseCase: UpdateUsecase,
        private uploadUseCase: UploadImageUseCase,
        private resendOTPUseCase: ResendOTPUseCase,
        private googleAuthUseCase: GoogleAuthUseCase,
        private verifyEmailUseCase: VerifyEmailUseCase,
        private forgotPasswordUseCase: ForgotPasswordUseCase,
        private changePasswordUseCase: ChangePasswordUseCase,
        private findAllUserUseCase: FindAllUserUseCase,
        private blockUnblockUseCase: BlockUnblockUseCase,
        private publishUserUpdateUseCase: PublishUserUpdateUseCase,
        private userAdminDashboardUseCase: UserAdminDashboardUseCase

    ) { }

    async signUpUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("req.body on controller", req.body);
        try {
            const formData = req.body;
            const newUser = await this.signUpUseCase.execute(formData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "req.body in login");
        const { email, password, role } = req.body;
        try {
            const { user, token ,refresh} = await this.loginUseCase.execute({ email, password, role });

            const ress = res.cookie('token', token);
            const resss = res.cookie('refreshToken', refresh);

            res.status(200).json({ message: 'User successfully logged in', user, role });
        } catch (error) {
            next(error);
        }
    }

    async verifyOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "from verifyOtp");
        try {
            const { email, otp } = req.body;
            const { token, user } = await this.otpVerificationUseCase.VerifyOtp(email, otp);
            res.status(200).json({ message: 'OTP verified successfully', token, user });
        } catch (error) {
            next(error)
        }
    }

    async getUser(req: any, res: Response, next: NextFunction): Promise<void> {
        console.log(req.user, "req.user kittunundo ?")
        try {
            const user = req.user._id
            console.log(user,"checking")
            const userDetails = await this.getUserDetailUseCase.getDetail(user)
            console.log(userDetails, "console")
            res.status(200).json({ message: 'success', userDetails });
        } catch (error) {
            res.status(400).json({ message: "Something happened" });
            next(error)
        }
    }

    async getDetails(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const id= req.params.id
            const userDetails = await this.getUserDetailUseCase.getDetail(id)
            console.log(userDetails, "console")
            res.status(200).json(userDetails);
        } catch (error) {
            res.status(400).json({ message: "Something happened" });
            next(error)
        }
    }


    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "checking in updateuser")
        try {
            const { firstName, lastName, email, phone } = req.body;
            const updatedUser = await this.updateUseCase.update({ firstName, lastName, phone, email });
           await this.publishUserUpdateUseCase.publish(updatedUser._id!, { firstName, lastName, email, phone });
            res.status(200).json({ message: 'User updated successfully', updatedUser });
        } catch (error) {
            next(error);
        }
    }

    async uploadImage(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const file = req.file
            console.log(file, "gettting")
            if (!file) {
                throw new Error("File is not found")
            }
            const id = req.user._id
            console.log(id, "checking email")
            if (!id) {
                throw new Error("User not found")
            }
            const imageUrl = await this.uploadUseCase.uploadImage(file, id)
            res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
        } catch (error) {
            next(error)
        }
    }

    async resendOTP(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body
            console.log(email)
            await this.resendOTPUseCase.ResendOTP(email)
            res.status(200).json({ message: 'OTP resent successfully' });
        } catch (error) {
            next(error)
        }
    }

    async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { code } = req.body
            const { token, userDetails,refresh } = await this.googleAuthUseCase.GoogleAuth(code)
            const ress = res.cookie('token', token);
            const resss = res.cookie('refreshToken', refresh);
           
            res.json({ token, userDetails, role: 'user' })
        } catch (error) {
            next(error)
        }
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body
            console.log(email)
            await this.verifyEmailUseCase.VerifyEmail(email)
            res.status(200).json({ message: "verify succefully" });
        } catch (error) {
            next(error)
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, newPassword } = req.body
            await this.forgotPasswordUseCase.ForgotPassword(email, newPassword)
            res.status(200).json({ success: true });
        } catch (error) {
            next(error)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, "getting or not ?")
        try {
            const { email, password, newPassword } = req.body
            await this.changePasswordUseCase.ChangePassword(email, password, newPassword)
            res.status(200).json({ success: true });
        } catch (error) {
            next(error)
        }
    }

    async findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.findAllUserUseCase.FindAllUsers()
            res.status(200).json( users );
        } catch (error) {
            next(error)
        }
    }
    async userAdminDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userAdminDashboardUseCase.UserAdminDashboard()
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }
    async blockUblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId,newStatus} = req.body
            await this.blockUnblockUseCase.BlockUnblock(userId,newStatus)
            res.status(200).json({ success: true });
        } catch (error) {
            next(error)
        }
    }
}

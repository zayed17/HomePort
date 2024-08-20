import { EmailInterface, RedisOtpInterface } from '../repositories/interface';

export class ResendOTPUseCase {
  constructor(
    private emailService: EmailInterface,
    private otpService: RedisOtpInterface,
  ) { }

  async ResendOTP(email: string): Promise<void> {
    try {
      const otp = this.emailService.generateOTP()
      await this.otpService.resendOTP(email, otp)
      await this.emailService.sendEmail(email, "Resent OTP", `Your new OTP is ${otp}`);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
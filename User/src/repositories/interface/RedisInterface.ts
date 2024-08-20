export interface RedisOtpInterface {
    storeOTP(email: string, otp: string): Promise<void>;
    retrieveOTP(email: string): Promise<string | null>;
    deleteOTP(email: string): Promise<void>;
    resendOTP(email:string,otp:string): Promise<void>
}

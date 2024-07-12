export interface EmailInterface {
    sendEmail(to: string, subject: string, text: string): Promise<void>;
    generateOTP(): string;
}

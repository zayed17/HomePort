import {EmailInterface} from '../interface'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { generateOTP } from '../../utils/otpGenerator';
dotenv.config()
export class EmailRepository implements EmailInterface {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
    }

    generateOTP(): string { 
        return generateOTP(); 
    }
}

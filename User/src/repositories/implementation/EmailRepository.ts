import { EmailInterface } from '../interface';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { generateOTP } from '../../utils/otpGenerator';

dotenv.config();

export class EmailRepository implements EmailInterface {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        console.log( process.env.EMAIL_USER, process.env.EMAIL_PASSWORD,".env is getting or not ")
        console.log(to, subject, text, "getting or not");
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

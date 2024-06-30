import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: process.env.email_user, 
            pass: process.env.password_user
        },
    });

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.email_user,
            to,
            subject,
            text,
        });
    }
}

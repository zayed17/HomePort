import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config()

export class RedisOTPService {
    private client = new Redis({
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    });

    async storeOTP(email: string, otp: string): Promise<void> {
        await this.client.set(email, otp, 'EX', 2 * 60); 
    }

    async retrieveOTP(email: string): Promise<string | null> {
        return await this.client.get(email);
    }

    async deleteOTP(email: string): Promise<void> {
        await this.client.del(email);
    }
}

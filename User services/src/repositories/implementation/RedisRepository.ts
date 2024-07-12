import Redis from 'ioredis';
import dotenv from 'dotenv';
import { RedisOtpInterface } from '../interface';

dotenv.config();

export class RedisOTPRepository implements RedisOtpInterface {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            password: process.env.REDIS_PASSWORD,
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });

        this.client.on("connect", () => {
            console.log("Connected to Redis");
        });

        this.client.on("error", (err) => {
            console.error("Redis connection error:", err);
        });
    }

    async storeOTP(email: string, otp: string): Promise<void> {
        await this.client.set(email, otp, 'EX', 2 * 60);
    }

    async retrieveOTP(email: string): Promise<string | null> {
        return await this.client.get(email);
    }

    async deleteOTP(email: string): Promise<void> {
        await this.client.del(email);
    }
    
    async resendOTP(email:string,otp:string):Promise<void>{
        await this.storeOTP(email,otp)
    }
}

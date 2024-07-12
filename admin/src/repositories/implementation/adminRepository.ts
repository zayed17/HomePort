import { Admin } from '../../entities/adminEntity';
import { adminInterface } from '../interface/adminInterface';
import dotenv from 'dotenv';
dotenv.config()

const adminData: Admin = {
  email:process.env.EMAIL!,
  password: process.env.PASSWORD!
};

export class AdminRepository implements adminInterface {
  async findByEmailAndPassword(email: string, password: string): Promise<Admin | null> {
    if (email === adminData.email && password === adminData.password) {
      return adminData;
    }
    return null;
  }
}
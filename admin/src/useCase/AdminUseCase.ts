import { Admin } from '../entities/adminEntity';
import { adminInterface } from '../repositories/interface/adminInterface';
import { generateToken } from '../../../HomePackage/src';


export class AdminUseCase {
  constructor(private adminRepository: adminInterface) {}

  async authenticate(email: string, password: string): Promise<{admin:Admin | null,token:string}> {
    const admin = await this.adminRepository.findByEmailAndPassword(email, password);
    if(!admin){
      throw new Error('Invalid email or password');  
    }
    const token = generateToken({email:email,role:'admin'})

    return {admin,token};
  }
}
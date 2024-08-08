import {  UserPropertyInterface } from '../repositories';
import { UserData } from '../entities/userPropertyEntity';

export class FindUserUseCase {
  constructor(
    private userPropertyInterface: UserPropertyInterface) { }

  async FindUser(_id:string): Promise<UserData | null> {
    const user = await this.userPropertyInterface.findUser({_id})
    return user
  }
}
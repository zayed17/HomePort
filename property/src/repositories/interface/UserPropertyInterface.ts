import { UserData } from '../../entities/userPropertyEntity';

export interface UserPropertyInterface {
  findUser(filter: any): Promise<UserData | null>;
  addUser(user: UserData): Promise<UserData>;
}
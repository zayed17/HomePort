import { UserData } from '../../entities/userPropertyEntity';

export interface UserPropertyInterface {
  findUser(filter: any): Promise<UserData | null>;
  addUser(user: UserData): Promise<UserData>;
  updateUser(_id: string, user: Partial<UserData>): Promise<void>;
  findUserFavorites(_id:string): Promise<any>;
}
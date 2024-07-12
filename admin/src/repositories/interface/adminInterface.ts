import {Admin} from '../../entities/adminEntity'

export interface adminInterface {
    findByEmailAndPassword(email: string, password: string): Promise<Admin | null>;
}
import { UserInterface } from '../repositories/interface';

export class ChangePasswordUseCase {
    constructor(private userRepository: UserInterface) { }
    async ChangePassword(email: string, password: string, newPassword: string): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email)
            if (!user) {
                throw new Error("User not found")
            }
            if (user.password != password) {
                throw new Error("Password not match")
            }
            await this.userRepository.update(email, { password: newPassword });
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
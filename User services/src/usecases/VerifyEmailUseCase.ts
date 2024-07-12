import { UserInterface } from '../repositories/interface';

export class VerifyEmailUseCase {
    constructor(private userRepository: UserInterface) {}
    async VerifyEmail(email: string): Promise<void> {
        const userExits = await this.userRepository.findByEmail(email)
        if (!userExits) {
            throw new Error("user not found")
        }
    }
}
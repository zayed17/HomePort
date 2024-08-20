import { UserInterface } from '../repositories/interface';

export class VerifyEmailUseCase {
    constructor(private userRepository: UserInterface) {}
    async VerifyEmail(email: string): Promise<void> {
        const userExits = await this.userRepository.findOne({email})
        if (!userExits) {
            throw new Error("user not found")
        }
    }
}
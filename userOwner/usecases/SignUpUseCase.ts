import { User } from '../entities/userEntity';
import { UserRepository } from '../repositories/UserRepository';

interface SignUpParams {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
}

export class SignUpUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(params: SignUpParams): Promise<User> {
        if (!params.firstName || !params.lastName || !params.email || !params.phone || !params.password) {
            throw new Error('Missing required fields');
        }

        const existingUser = await this.userRepository.findByEmail(params.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = new User({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            phone: params.phone,
            password: params.password,
        });

        await this.userRepository.save(newUser);

        return newUser;
    }
}

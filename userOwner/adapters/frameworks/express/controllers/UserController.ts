import { Request, Response } from 'express';
import { MongooseUserRepository } from '../../../../infrastructure/database/MongoDBUserRepository';
import { SignUpUseCase } from '../../../../usecases/SignUpUseCase';

const userRepository = new MongooseUserRepository();
const signUpUseCase = new SignUpUseCase(userRepository);

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    console.log("req.body on controller",req.body)
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        const newUser = await signUpUseCase.execute({ firstName, lastName, email, phone, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Unexpected Happened" });
    }
};

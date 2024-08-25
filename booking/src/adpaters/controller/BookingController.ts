import { Request, Response, NextFunction } from 'express';
import {CloseDealUseCase } from '../../useCase';


export class BookingController {
    constructor(
        private closeDealUseCase: CloseDealUseCase,
     ) { }

    async closeDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {bookingId} = req.body;
            const newUser = await this.closeDealUseCase.closeDeal(bookingId);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

}

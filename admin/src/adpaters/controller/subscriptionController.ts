import { NextFunction, Request, Response } from 'express';
import { AddSubscriptionUseCase, FindAllSubscriptionUseCase } from '../../useCase';

export class SubscriptionController {
    constructor(
        private addSubscriptionUseCase: AddSubscriptionUseCase,
        private findAllSubscriptionUseCase: FindAllSubscriptionUseCase
    ) { }

    async addSubscription(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const formData = req.body;
            await this.addSubscriptionUseCase.addSubscription(formData)
            res.json({ status: true })
        } catch (error) {
            next(error)
        }
    }

    async getSubscriptions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.findAllSubscriptionUseCase.findAllSubscription()
            console.log(result)
            res.json({ subscriptions: result });
        } catch (error) {
            next(error)
        }
    }

}
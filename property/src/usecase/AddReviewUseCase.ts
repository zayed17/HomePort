import mongoose from 'mongoose';
import { UserPropertyInterface, ReviewInterace } from '../repositories';

export class AddReviewUseCase {
    constructor(
        private userPropertyInterface: UserPropertyInterface,
        private reviewInterace: ReviewInterace
    ) { }

    async addReview(userId: string, rating: number, description: string,propertyId: any): Promise<void> {
        console.log(userId,propertyId,rating,description,typeof userId,typeof propertyId, typeof rating, typeof description)
        await this.reviewInterace.addReview({
            userId:new mongoose.Types.ObjectId(userId),
            propertyId: new mongoose.Types.ObjectId(propertyId),
            rating,
            description,
        });
    }
}
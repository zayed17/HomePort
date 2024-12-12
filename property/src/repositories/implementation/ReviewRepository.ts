import { ReviewInterace } from '../interface';
import { Review } from '../../entities/reviewProperty';
import ReviewModel from '../../infrastructure/mongodb/ReviewPropertyModel';

export class ReviewRepository implements ReviewInterace {

  async addReview(review: Review): Promise<any> {

    const newReview = new ReviewModel(review);
    return  newReview.save();
  }

  async findByPropertyId(propertyId: string): Promise<any[]> {
    return await ReviewModel.find({ propertyId }).populate('userId')
  }


}
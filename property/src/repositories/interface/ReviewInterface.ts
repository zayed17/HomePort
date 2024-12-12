import { Review } from '../../entities/reviewProperty';

export interface ReviewInterace {
  addReview(review: Review): Promise<Review>;
  findByPropertyId(propertyId: string): Promise<Review[]>;
}
import { Review } from '../../entities/reviewProperty';

export interface ReviewInterace {
  addReview(review: Review): Promise<Review>;
//   find(filter?: Partial<Property>): Promise<Property[]>;
//   findWithPagination(filter?: Partial<Property>, page?: number, limit?: number): Promise<any>;
//   findOne(filter: any): Promise<Property | null>;
//   updateProperty(_id: string, property: Partial<Property>): Promise<void>;
//   findOneWithPopulation(filter: any,populate:string): Promise<Property | null>;
}
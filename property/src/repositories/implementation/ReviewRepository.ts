import { ReviewInterace } from '../interface';
import { Review } from '../../entities/reviewProperty';
import ReviewModel from '../../infrastructure/mongodb/ReviewPropertyModel';

export class ReviewRepository implements ReviewInterace {

  async addReview(review: Review): Promise<any> {

    const newReview = new ReviewModel(review);
    return  newReview.save();
  }

//   async find(filter: Partial<Property> = {}): Promise<Property[]> {
//     return PropertyModel.find(filter) as any
//   }

//   async findOne(filter: any): Promise<Property | null> {
//     return PropertyModel.findOne(filter) as any
//   }

//   async findOneWithPopulation(filter: any,populate:string): Promise<any | null> {
//     return PropertyModel.findOne(filter).populate(populate) as any
//   }

//   async updateProperty(_id: string, property: Partial<Property>): Promise<void> {
//     await PropertyModel.updateOne({ _id }, { $set: property })
//   }

//   async findWithPagination(filter:any,page:number,limit:number):Promise<any>{
//     const skip = (page - 1) * limit; 
//     const properties = await PropertyModel.find(filter).skip(skip).limit(limit).exec(); 
//     const total = await PropertyModel.countDocuments(filter).exec();
//     return {properties,total} as any
//   }
}
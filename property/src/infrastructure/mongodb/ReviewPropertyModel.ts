import mongoose from 'mongoose'
import { ReviewData } from '../../entities/reviewProperty';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
  propertyId:{ type: mongoose.Schema.Types.ObjectId, ref:"Property" ,required: true  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String,required:true },
},{
    timestamps:true
});

const ReviewModel = mongoose.model<ReviewData>('Review', reviewSchema);

export default ReviewModel;
import mongoose, { Schema } from 'mongoose';

enum PropertyStatus {
  PENDING = 'pending',
  APPROVED = 'verified',
  REJECTED = 'rejected'
}
interface Sponsorship {
  isSponsored: boolean;
  details?: {
    startDate?: Date;
    endDate?: Date; 
    amount?: number; 
  };
}

interface BookingDetails {
  userId: Schema.Types.ObjectId;
  userName: string;
  bookingDate: Date;
  amountPaid:number;
  _id: Schema.Types.ObjectId;
}

interface PropertyDocument  {
  propertyType: string;
  reason?: string;
  isBooked:boolean;
  address: string;
  bookedDetails?: BookingDetails[]; 
  city: string;
  mediaFiles: string[];
  depositAmount?: number;
  facing: string;
  propertyAge: string;
  totalFloors: number;
  openings: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  totalArea: number;
  hasWell: string;
  furnisherType: string;
  electronics?: object;
  rentAmount?: number;
  isNegotiable: string;
  areBillsIncluded?: string;
  eligibility: string;
  availableFrom: string;
  otherRooms: string[];
  propertyFeatures: string[];
  propertyAdvantages: string[];
  noOfCars: number;
  noOfScooters: number;
  noOfBikes: number;
  directionTips: string;
  sellPrice?: number;
  propertyCondition?: string;
  status: PropertyStatus;
  lookingFor: string;
  createdBy: Schema.Types.ObjectId; 
  isBlock: boolean;
  noOfReports:number;
  sponsorship?: Sponsorship; 
  createdAt?: Date;
  updatedAt?: Date;
  longitude: number,
  latitude: number,
}

const PropertySchema: Schema = new Schema({
  propertyType: { type: String, required: true },
  isBooked:{type:Boolean,default:false},
  bookedDetails: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      userName: { type: String, required: true },
      bookingDate: { type: Date, required: true },
      amountPaid:{type:Number,required:true},
      _id:{type:Schema.Types.ObjectId,required:true}
    }],
  address: { type: String, required: true },
  city: { type: String, required: true },
  mediaFiles: { type: [String], required: true },
  depositAmount: { type: Number, required: false },
  facing: { type: String, required: true },
  propertyAge: { type: String, required: true },
  totalFloors: { type: Number, required: true },
  openings: { type: Number, required: true },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  balconies: { type: Number, required: true },
  totalArea: { type: Number, required: true },
  hasWell: { type: String, required: true },
  furnisherType: { type: String, required: true },
  electronics: { type: Object, required: false },
  rentAmount: { type: Number, required: false },
  isNegotiable: { type: String, required: true },
  areBillsIncluded: { type: String, required: false },
  eligibility: { type: String, required: true },
  availableFrom: { type: String, required: true },
  otherRooms: { type: [String], required: true },
  propertyFeatures: { type: [String], required: true },
  propertyAdvantages: { type: [String], required: true },
  noOfCars: { type: Number, required: true },
  noOfScooters: { type: Number, required: true },
  noOfBikes: { type: Number, required: true },
  noOfReports: { type: Number, default:0},
  directionTips: { type: String, required: true },
  sellPrice: { type: Number, required: false },
  propertyCondition: { type: String, required: false },
  lookingFor: { type: String, required: false },
  status: { type: String, enum: PropertyStatus, default: PropertyStatus.PENDING, required: true },
  reason: { type: String, required: false },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  isBlock: { type: Boolean, required: true, default: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  sponsorship: {
    isSponsored: { type: Boolean, default: false },
    details: {
      startDate: { type: Date },
      endDate: { type: Date },
      amount: { type: Number }
    }
  },
}, {
  timestamps: true
});

const PropertyModel = mongoose.model<PropertyDocument>('Property', PropertySchema);

export default PropertyModel;
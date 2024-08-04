import mongoose, { Schema, Document } from 'mongoose';

enum PropertyStatus {
  PENDING = 'pending',
  APPROVED = 'verified',
  REJECTED = 'rejected'
}

interface PropertyDocument extends Document {
  propertyType: string;
  reason?: string;
  address: string;
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
  electronics?: Record<string, boolean>;
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
  lookingFor:string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema: Schema = new Schema({
  propertyType: { type: String, required: true },
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
  electronics: { type: Map, of: Boolean, required: false },
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
  directionTips: { type: String, required: true },
  sellPrice: { type: Number, required: false },
  propertyCondition: { type: String, required: false },
  lookingFor: { type: String, required: false },
  status: { type: String, enum: PropertyStatus, default: PropertyStatus.PENDING, required: true },
  reason: { type: String, required: false },
  createdBy: { type: Schema.Types.ObjectId, required: true ,ref: 'User'},
  isBlock: { type: Boolean, required: true, default:false },

}, {
  timestamps: true
});

const PropertyModel = mongoose.model<PropertyDocument>('Property', PropertySchema);

export default PropertyModel;
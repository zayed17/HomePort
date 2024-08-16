import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
    address: string;
    availableFrom: Date;
    listingType: 'rent' | 'sell';
    image:string;
    rentAmount?: number;
    sellPrice?: number;
    depositAmount?: number;
    createdBy: {
        userId: string;
        name: string;
        email: string;
        phone: string;
    };
}

const PropertySchema: Schema = new Schema({
    address: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    image:{type:String,required:true},
    listingType: { type: String, enum: ['rent', 'sell'], required: true },
    rentAmount: { type: Number },
    sellPrice: { type: Number },
    depositAmount: { type: Number },
    createdBy: {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });

const PropertyModel = mongoose.model<IProperty>('Property', PropertySchema);

export default PropertyModel;
import mongoose, { Document } from 'mongoose';

export interface SubscriptionDocument extends Document {
    type:string;
    price:Number;
    durationInDays:Number;
    features:string[];
    propertiesLimit:Number;
    sponsoredPropertiesLimit:Number
}

const SubscriptionSchema = new mongoose.Schema<SubscriptionDocument>({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, required: true },
    features: { type: [String], default: [] },
    propertiesLimit: { type: Number, required: true },
    sponsoredPropertiesLimit: { type: Number, required: true },
});

const SubscriptionModel = mongoose.model<SubscriptionDocument>('Subscription', SubscriptionSchema);

export default SubscriptionModel;
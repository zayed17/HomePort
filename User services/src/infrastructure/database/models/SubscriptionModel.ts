import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  type:{type:String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date },
  endDate: { type: Date },
});

const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

export default SubscriptionModel;
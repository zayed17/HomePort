import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
  startDate: { type: Date },
  endDate: { type: Date },
});

const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

export default SubscriptionModel;
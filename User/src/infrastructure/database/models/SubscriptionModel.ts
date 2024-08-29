import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['basic', 'standard', 'premium'], 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  propertyLimit: { 
    type: Number, 
    default: 0 
  },
  price:{
    type: Number, 
    required:true
  },

  sponsoredLimit: { 
    type: Number, 
    default: 0 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
});

const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

export default SubscriptionModel;
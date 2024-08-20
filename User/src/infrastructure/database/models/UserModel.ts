import mongoose from 'mongoose';
import { User } from '../../../entities'

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, default:"null"},
    active:{type:Boolean,default:false},
    postedProperty:{type:Number,default:0},
    sponsoredPosted:{type:Number,default:0},
    image:{type:String,default:null},
    roles:{type:[String],default:["user"]},
    favourite:{type:[String],default:[]},
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;

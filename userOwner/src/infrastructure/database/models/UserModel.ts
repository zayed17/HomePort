import mongoose from 'mongoose';
import { User } from '../../../entities'

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    active:{type:Boolean,default:false},
    roles:{type:[String],default:[]}
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;

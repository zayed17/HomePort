// infrastructure/database/models/UserModel.ts

import mongoose from 'mongoose';
import { User } from '../../../entities/userEntity'

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;

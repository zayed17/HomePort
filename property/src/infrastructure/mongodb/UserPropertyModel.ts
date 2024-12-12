import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true}, 
    imageUrl: { type: String,required:false }
}, {
    timestamps: true
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
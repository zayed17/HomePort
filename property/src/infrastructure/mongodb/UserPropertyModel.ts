import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    favourites: mongoose.Types.ObjectId[]; 
}

const UserSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Property' }, 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    favourites: { type: [Schema.Types.ObjectId], ref: 'Property', default: [] }
}, {
    timestamps: true
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
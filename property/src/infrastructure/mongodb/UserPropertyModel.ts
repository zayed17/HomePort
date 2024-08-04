import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
    name: string;
    email: string;
    phone: string;
    favourites: mongoose.Types.ObjectId[]; // Array of ObjectIds
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email should be unique
    phone: { type: String, required: true, unique: true }, // Phone should be unique
    favourites: { type: [Schema.Types.ObjectId], ref: 'Property', default: [] } // Array of ObjectIds
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
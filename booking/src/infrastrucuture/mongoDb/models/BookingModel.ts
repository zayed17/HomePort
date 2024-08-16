import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    userId: string;
    propertyId: string;
    bookingDate: Date;
    totalAmount: number;
    amountPaid: string;
    status: 'pending' | 'confirmed' | 'canceled';
    paymentMethod: string;
    transactionId?: string;
}

const BookingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    bookingDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    amountPaid: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], required: true },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String }
}, { timestamps: true });

const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
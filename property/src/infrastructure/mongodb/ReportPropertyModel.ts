import { Schema, model, Document } from 'mongoose';

export interface IReport extends Document {
    reportId: string;
    propertyId: string;
    reason: string;
    description?: string;
    status: 'pending' | 'reviewed' | 'resolved';
}

const reportSchema = new Schema<IReport>({
    reportId: { type: String, required: true },
    propertyId: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' }
}, {
    timestamps: true
});

const Report = model<IReport>('Report', reportSchema);

export default Report;
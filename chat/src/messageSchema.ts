import mongoose, { Schema, Document } from 'mongoose'
interface Reaction {
  type: string;
  userId: string;
}

interface MessageDocument extends Document {
  chatId: string;
  senderId: string;
  message?: string;
  photoUrl?: string; 
  timestamp: Date;
  reactions: Reaction[];
}

const reactionSchema = new Schema<Reaction>({
  type: { type: String, required: true },
  userId: { type: String, required: true },
});

const messageSchema = new Schema<MessageDocument>({
  chatId: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String },
  photoUrl: { type: String }, 
  timestamp: { type: Date, default: Date.now },
  reactions: [reactionSchema],
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;
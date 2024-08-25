// import mongoose, { Schema, Document } from 'mongoose';

// export interface IReaction {
//   type: string; 
//   userId: string; 
// }

// export interface IMessage extends Document {
//   chatId: string;
//   senderId: string;
//   message: string;
//   timestamp: Date;
//   reactions: IReaction[];
// }

// const ReactionSchema: Schema = new Schema({
//   type: { type: String, required: true }, 
//   userId: { type: String, required: true }, 
// });

// const MessageSchema: Schema = new Schema({
//   chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
//   senderId: { type: String, required: true },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
//   reactions: [ReactionSchema],
// });

// const Message = mongoose.model<IMessage>('Message', MessageSchema);
// export default Message;

import mongoose, { Schema, Document } from 'mongoose';

interface Reaction {
  type: string;
  userId: string;
}

interface MessageDocument extends Document {
  chatId: string;
  senderId: string;
  message?: string;
  photoUrl?: string; // Field for storing photoUrl URL
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
  photoUrl: { type: String }, // Consolidated field for photos
  timestamp: { type: Date, default: Date.now },
  reactions: [reactionSchema],
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;
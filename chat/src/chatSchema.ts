import mongoose, { Schema, Document } from 'mongoose';

interface IParticipant {
  userId: string;
  name: string;
  photo: string;
}

export interface IChat extends Document {
  participants: IParticipant[];
}

const ParticipantSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: false },
});

const ChatSchema: Schema = new Schema({
  participants: [ParticipantSchema],
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
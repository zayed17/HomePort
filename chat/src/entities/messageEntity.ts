export interface ReactionData {
    type: string;
    userId: string;
  }
  
  export interface MessageData {
    _id?: string;
    chatId: string;
    senderId: string;
    message?: string;
    photoUrl?: string;
    timestamp?: Date;
    reactions: ReactionData[];
  }
  
  export class Reaction {
    type: string;
    userId: string;
  
    constructor({ type, userId }: ReactionData) {
      this.type = type;
      this.userId = userId;
    }
  }
  
  export class Message {
    _id?: string;
    chatId: string;
    senderId: string;
    message?: string;
    photoUrl?: string;
    timestamp: Date;
    reactions: Reaction[];
  
    constructor({
      _id,
      chatId,
      senderId,
      message,
      photoUrl,
      timestamp = new Date(),
      reactions
    }: MessageData) {
      this._id = _id;
      this.chatId = chatId;
      this.senderId = senderId;
      this.message = message;
      this.photoUrl = photoUrl;
      this.timestamp = timestamp;
      this.reactions = reactions.map(reaction => new Reaction(reaction));
    }
  }
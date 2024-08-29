export interface ParticipantData {
    userId: string;
    name: string;
    photo?: string;
  }
  
  export interface ChatData {
    _id?: string;
    participants: ParticipantData[];
  }
  
  export class Participant {
    userId: string;
    name: string;
    photo?: string;
  
    constructor({ userId, name, photo }: ParticipantData) {
      this.userId = userId;
      this.name = name;
      this.photo = photo;
    }
  }
  
  export class Chat {
    _id?: string;
    participants: Participant[];
  
    constructor({ _id, participants }: ChatData) {
      this._id = _id;
      this.participants = participants.map(participant => new Participant(participant));
    }
  }
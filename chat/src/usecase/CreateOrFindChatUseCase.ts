import { ChatInterface } from '../repositories/interface';
import { ChatData, Participant } from '../entities/chatEntity';

export class CreateOrFindChatUseCase {
  constructor(private chatRepository: ChatInterface) {}

  private sortParticipants(participants: Participant[]): Participant[] {
    return participants.sort((a, b) => a.userId.localeCompare(b.userId));
  }

  async execute(participants: Participant[]): Promise<ChatData> {
    const sortedParticipants = this.sortParticipants(participants);

    const participantIds = sortedParticipants.map(p => p.userId);
    const existingChat = await this.chatRepository.findChatByParticipants(participantIds);

    if (existingChat) {
      return existingChat;
    }

    const newChat: ChatData = {
      participants: sortedParticipants,
    };

    return await this.chatRepository.createChat(newChat);
  }
}
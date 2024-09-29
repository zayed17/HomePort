import { MessageInterface } from '../repositories/interface';
import { ReactionData } from '../entities/messageEntity';

export class AddReactionUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(messageId: string, reaction: ReactionData): Promise<void> {
    const message = await this.messageRepository.findMessageById(messageId);

    if (!message) {
      throw new Error('Message not found');
    }

    const existingReaction = message.reactions.find(
      (r) => r.userId === reaction.userId
    );

    if (existingReaction) {
      existingReaction.type = reaction.type;
    } else {
      message.reactions.push(reaction);
    }

    await this.messageRepository.updateMessage(message);

  }
}
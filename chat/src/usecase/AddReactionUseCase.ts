import { MessageInterface } from '../repositories/interface';
import { ReactionData } from '../entities/messageEntity';

export class AddReactionUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(messageId: string, reaction: ReactionData): Promise<void> {
    console.log(1)
    const message = await this.messageRepository.findMessageById(messageId);
    console.log(2)

    if (!message) {
      throw new Error('Message not found');
    }
    console.log(3)

    const existingReaction = message.reactions.find(
      (r) => r.userId === reaction.userId
    );
    console.log(4)

    if (existingReaction) {
      existingReaction.type = reaction.type;
    } else {
      message.reactions.push(reaction);
    }
    console.log(5)

    // await this.messageRepository.saveMessage(message);
    console.log(6)

  }
}
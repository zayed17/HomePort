import { MessageBrokerService } from '../services/MessageBrokerService';

export class PublishUserUpdateUseCase {
    constructor(private messageBrokerService: MessageBrokerService) {}
    async publish(userId: string, data: any) {
        await this.messageBrokerService.publishUserUpdate(userId, data);
    }
}
export interface NotificationInterface {
    sendNotification(eventName: string, data: Record<string, any>): Promise<void>;
}
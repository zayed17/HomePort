export interface SubscriptionData {
    _id?: string;
    userId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
}
export class Subscription {
    _id?: string;
    userId: string;
    planId: string;
    startDate: Date;
    endDate: Date;

    constructor({
        _id,
        userId,
        planId,
        startDate,
        endDate
    }: SubscriptionData) {
        this._id = _id;
        this.userId = userId;
        this.planId = planId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
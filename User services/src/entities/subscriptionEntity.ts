export interface SubscriptionData {
    _id?: string;
    userId:string;
    startDate: Date;
    endDate: Date;
    type:string
}
export class Subscription {
    _id?: string;
    userId:string;
    startDate: Date;
    endDate: Date;
    type:string

    constructor({
        _id,
        userId,
        startDate,
        endDate,
        type
    }: SubscriptionData) {
        this._id = _id;
        this.userId = userId,
        this.startDate = startDate;
        this.endDate = endDate;
        this.type=type
    }
}
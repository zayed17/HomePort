export interface SubscriptionData {
  _id?: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  type: 'basic' | 'standard' | 'premium'; 
  propertyLimit: number;
  sponsoredLimit: number;
  price:number;
}

export class Subscription {
  _id?: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  type: 'basic' | 'standard' | 'premium';
  propertyLimit: number;
  sponsoredLimit: number;
  price:number;

  constructor({
    _id,
    userId,
    startDate,
    endDate,
    type,
    propertyLimit,
    sponsoredLimit,
    price
  }: SubscriptionData) {
    this._id = _id;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.propertyLimit = propertyLimit;
    this.sponsoredLimit = sponsoredLimit;
    this.price = price;
  }
}
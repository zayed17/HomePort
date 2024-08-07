export interface SubscriptionData {
    _id?: string;
    type: string;
    price: number;
    durationInDays: number;
    features: string[];
    propertiesLimit: number;
    sponsoredPropertiesLimit: number;


}

export class Subscription {
    _id?: string;
    type: string;
    price: number;
    durationInDays: number;
    features: string[];
    propertiesLimit: number;
    sponsoredPropertiesLimit: number;


 

    constructor({ _id, type, price, durationInDays, features,propertiesLimit, sponsoredPropertiesLimit }: SubscriptionData) {
        this._id = _id;
        this.type = type;
        this.price = price;
        this.durationInDays = durationInDays;
        this.features = features;
        this.propertiesLimit = propertiesLimit;
        this.sponsoredPropertiesLimit = sponsoredPropertiesLimit
    }
}
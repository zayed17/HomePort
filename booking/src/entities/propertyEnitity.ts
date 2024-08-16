export interface PropertyData {
    _id: string;
    address: string;
    availableFrom: Date;
    listingType: 'rent' | 'sell'; 
    rentAmount?: number; 
    image:string;
    sellPrice?: number;  
    depositAmount?:number;
    createdBy: {
        userId: string;
        name: string;
        email: string;
        phone: string;
    };
}

export class Property {
    _id: string;
    address: string;
    availableFrom: Date;
    listingType: 'rent' | 'sell'; 
    depositAmount?:number;
    rentAmount?: number;
    image:string;
    sellPrice?: number;
    createdBy: {
        userId: string;
        name: string;
        email: string;
        phone: string;
    };

    constructor({
        _id,
        address,
        availableFrom,
        listingType, 
        image,
        rentAmount,
        sellPrice,
        depositAmount,
        createdBy,
    }: PropertyData) {
        this._id = _id;
        this.address = address;
        this.availableFrom = availableFrom;
        this.listingType = listingType;
        this.rentAmount = rentAmount;
        this.image = image;
        this.sellPrice = sellPrice;
        this.depositAmount = depositAmount;
        this.createdBy = createdBy;
    }
}
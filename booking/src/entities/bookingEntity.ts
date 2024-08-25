export interface BookingData {
    _id?:string;
    userId: string;
    propertyId: any; 
    bookingDate: Date; 
    totalAmount: number; 
    amountPaid:number;
    status: 'pending' | 'booked' | 'canceled'; 
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string; 
}

export class Booking {
    _id?:string;
    userId: string;
    propertyId: any;
    bookingDate: Date;
    totalAmount: number;
    amountPaid:number;
    status: 'pending' | 'booked' | 'canceled';
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string;

    constructor({
        _id;
        userId,
        propertyId,
        bookingDate,
        totalAmount,
        status,
        amountPaid,
        paymentMethod,
        transactionId,
    }: BookingData) {
        this._id = _id;
        this.userId = userId;
        this.propertyId = propertyId;
        this.bookingDate = bookingDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.amountPaid = amountPaid;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
    }
}
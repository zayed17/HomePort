export interface BookingData {
    userId: string;
    propertyId: string; 
    bookingDate: Date; 
    totalAmount: number; 
    amountPaid:string;
    status: 'pending' | 'confirmed' | 'canceled'; 
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string; 
}

export class Booking {
    userId: string;
    propertyId: string;
    bookingDate: Date;
    totalAmount: number;
    amountPaid:string;
    status: 'pending' | 'confirmed' | 'canceled';
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string;

    constructor({
        userId,
        propertyId,
        bookingDate,
        totalAmount,
        status,
        amountPaid,
        paymentMethod,
        transactionId,
    }: BookingData) {
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
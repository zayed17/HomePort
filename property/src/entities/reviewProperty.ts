export interface ReviewData {
    userId:any;
    propertyId: any;
    rating: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Review {
    userId:any;
    propertyId: any;
    rating: number;
    description: string;
    createdAt?: Date; 
    updatedAt?: Date;

    constructor({
        userId,
        propertyId,
        rating,
        description,
        createdAt,
        updatedAt
    }: ReviewData) {
        this.userId = userId
        this.propertyId = propertyId;
        this.rating = rating;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
}
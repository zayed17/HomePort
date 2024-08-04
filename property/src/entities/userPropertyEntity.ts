export interface UserData {
    userId:string;
    name: string;
    email: string;
    phone: string;
    favourites: string[]; 
}

export class User {
    userId:string;
    name: string;
    email: string;
    phone: string;
    favourites: string[];

    constructor({userId,name, email,phone, favourites}: UserData) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.favourites = favourites;
    }
}
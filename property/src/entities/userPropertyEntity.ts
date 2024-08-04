export interface UserData {
    _id:string;
    name: string;
    email: string;
    phone: string;
    favourites: string[]; 
}

export class User {
    _id:string;
    name: string;
    email: string;
    phone: string;
    favourites: string[];

    constructor({_id,name, email,phone, favourites}: UserData) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.favourites = favourites;
    }
}
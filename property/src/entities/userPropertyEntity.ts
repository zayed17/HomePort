export interface UserData {
    _id:any;
    name: string;
    email: string;
    phone: string;
    imageUrl: string; 
}

export class User {
    _id:any;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;

    constructor({_id,name, email,phone, imageUrl}: UserData) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
    }
}
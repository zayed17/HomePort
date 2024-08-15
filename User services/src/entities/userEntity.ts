export interface UserData {
    _id?:string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    active: boolean; 
    image:string | null;
    roles:string[];
    favourite:string[];
    postedProperty:number;
    sponsoredPosted:number
    subscriptionId?:string;
}

export class User {
    _id?:string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    active: boolean;
    image:string | null;
    roles:string[];
    postedProperty:number;
    favourite:string[];
    sponsoredPosted:number
    subscriptionId?:string;

    constructor({ firstName, lastName, email, phone, password, active, image ,roles,_id,favourite,subscriptionId,postedProperty,sponsoredPosted}: UserData) {
        this._id = _id
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.active = active; 
        this.image = image
        this.roles = roles
        this.favourite = favourite
        this.postedProperty = postedProperty
        this.sponsoredPosted = sponsoredPosted
        this.subscriptionId = subscriptionId
    }
}

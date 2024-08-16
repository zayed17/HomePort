export interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

export class User {
    _id: string;
    name: string;
    email: string;
    phone: string;

    constructor({
        _id,
        name,
        email,
        phone,
    }: UserData) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
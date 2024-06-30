export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    active: boolean; 
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    active: boolean; 

    constructor({ firstName, lastName, email, phone, password, active }: UserData) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.active = active; 
    }
}

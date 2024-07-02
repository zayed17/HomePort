export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    active: boolean; 
    roles:string[]
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    active: boolean;
    roles:string[];

    constructor({ firstName, lastName, email, phone, password, active, roles }: UserData) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.active = active; 
        this.roles = roles
    }
}

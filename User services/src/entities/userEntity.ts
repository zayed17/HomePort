export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    active: boolean; 
    image:string | null;
    roles:string[]
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    active: boolean;
    image:string | null;
    roles:string[];

    constructor({ firstName, lastName, email, phone, password, active, image ,roles }: UserData) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.active = active; 
        this.image = image
        this.roles = roles
    }
}

export interface userData{
    firstName:string,
    lastName:string,
    email:string,
    phone:number,
    password:string
}

export class User{
    firstName:string;
    lastName:string;
    email:string;
    phone:number;
    password:string

    constructor({firstName,lastName,email,phone,password}:userData){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phone = phone
        this.password = password
    }
}
export interface AdminData {
    email: string;
    password: string;
  }

export class Admin {
    email: string;
    password: string;

    constructor({ email, password }: AdminData) {
       this.email = email
       this.password = password
    }
}
 
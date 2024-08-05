import { UserPropertyInterface } from "../repositories";

export class UpdateUserDetailsUseCase {
    constructor(private userPropertyInterface: UserPropertyInterface) { }

    async updateUserDetails(userId: string, firstName: string, lastName: string, email: string, phone: string): Promise<void> {
        const user = await this.userPropertyInterface.findUser({_id:userId});
        console.log(user,"fs",userId,firstName,lastName,email,phone)
        const name = firstName + " " + lastName
        if (!user) {
            throw new Error("User not found");
        }
        await this.userPropertyInterface.updateUser(userId,{name,email,phone})
    }
}
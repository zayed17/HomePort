import { UpdateUserDetailsUseCase } from "../../usecase";

export class UpdateUserPropertyListener {
    constructor(private updateUserDetailsUseCase: UpdateUserDetailsUseCase) {}

    async handle(message: any): Promise<void> {
        if (!message) return;

        const content = JSON.parse(message.content.toString());
        console.log(content,"content chekcing")
        const { userId, firstName, lastName, email, phone } = content;

        await this.updateUserDetailsUseCase.updateUserDetails(userId, firstName, lastName, email, phone);
    }
}
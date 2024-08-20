// import { UserResponse } from '../proto/user_pb';
// import { UserRepository } from '../repositories';
// export class GetUserDetailsUseCase {
//   constructor(private userRepository: UserRepository) {}

//   async execute(userId: string): Promise<UserResponse> {
//     const user = await this.userRepository.findOne({_id:userId});
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const userResponse = new UserResponse();
//     userResponse.setUserId(user._id || ""); 
//     userResponse.setName(user.firstName || "");
//     userResponse.setEmail(user.email || "");
//     userResponse.setPhone(user.phone || ""); 
//     return userResponse;
//   }
// }
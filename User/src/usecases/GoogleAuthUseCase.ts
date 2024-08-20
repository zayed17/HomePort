import { UserInterface, GoogleAuthInterface } from '../repositories/interface';
import { generateToken } from '../../../HomePackage/src';

export class GoogleAuthUseCase {
  constructor(private userRepository: UserInterface,
    private googleAuthRepository: GoogleAuthInterface,
  ) { }

  async GoogleAuth(code: string): Promise<{ token: string, userDetails: any }> {
    try {
      const token = await this.googleAuthRepository.exchangeCodeForTokens(code)
      const userDetails = await this.googleAuthRepository.fetchUserProfile(token.access_token)
      console.log(userDetails, "user details is getted")
      const userExist = await this.userRepository.findOne({ email: userDetails.email })
      if (userExist) {
        const token = generateToken({ email: userDetails.email, role: ['user'] })
        return { token, userDetails: userExist }
      }
      const Jwttoken = generateToken({ email: userDetails.email, role: ['user'] })
      const newUser = {
        firstName: userDetails.given_name,
        lastName: userDetails.name,
        phone: "null",
        image: userDetails.picture,
        email: userDetails.email,
        password: userDetails.sub,
        active: true,
        roles: ['user'],
        favourite: []
      }
      await this.userRepository.save(newUser);
      return { token: Jwttoken, userDetails: newUser }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
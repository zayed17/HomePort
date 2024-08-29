import { UserInterface, GoogleAuthInterface } from '../repositories/interface';
import { generateRefreshToken, generateToken } from 'homepackage';

export class GoogleAuthUseCase {
  constructor(private userRepository: UserInterface,
    private googleAuthRepository: GoogleAuthInterface,
  ) { }

  async GoogleAuth(code: string): Promise<{ token: string, userDetails: any,refresh:string }> {
    try {
      const { access_token } = await this.googleAuthRepository.exchangeCodeForTokens(code);
      const userDetails = await this.googleAuthRepository.fetchUserProfile(access_token);
      const userExist = await this.userRepository.findOne({ email: userDetails.email })
      if (userExist) {
        const token = generateToken({ _id: userExist._id, role: ['user'] })
        const refresh = generateRefreshToken({_id:userExist._id,role:['user']})
        return { token, userDetails: userExist ,refresh}
      }
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
      const user =  await this.userRepository.save(newUser);
      const Jwttoken = generateToken({ email: user._id, role: ['user'] })
      const refresh = generateRefreshToken({_id:user._id,role:['user']})
      return { token: Jwttoken, userDetails: newUser ,refresh}
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
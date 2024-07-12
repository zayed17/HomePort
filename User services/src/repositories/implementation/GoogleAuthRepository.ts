import axios from 'axios';
import dontenv from 'dotenv'
dontenv.config()
import { GoogleAuthInterface } from '../interface';

export class GoogleAuthRepository implements GoogleAuthInterface {
  private clientId: string = process.env.CLIENT_ID!;
  private clientSecret: string = process.env.CLIENT_SECRET!;
  private redirectUri: string = 'http://localhost:5173'; 

  public async exchangeCodeForTokens(code: string): Promise<any> {
    try {
      const tokenUrl = 'https://oauth2.googleapis.com/token';
      const response = await axios.post(tokenUrl, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.redirectUri,
        grant_type: 'authorization_code',
      });
      return response.data;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }

  public async fetchUserProfile(accessToken: string): Promise<any> {
    try {
      const profileUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
      const profileResponse = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return profileResponse.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}
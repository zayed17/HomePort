export interface GoogleAuthInterface {
    exchangeCodeForTokens(code: string): Promise<any>;
    fetchUserProfile(accessToken: string): Promise<any>;
  }
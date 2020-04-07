export interface Token {
  expiresIn: number;
  tokenType: string;
  accessToken: string;
  refreshToken?: string;
}

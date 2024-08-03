export interface IAuthService {
  verify_token(token: string): Promise<void>;
}

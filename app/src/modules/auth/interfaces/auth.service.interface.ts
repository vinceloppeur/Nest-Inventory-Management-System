export interface IAuthService {
  verify_token(token: string): Promise<void>;

  extract_uid(token: string): Promise<string>;
}

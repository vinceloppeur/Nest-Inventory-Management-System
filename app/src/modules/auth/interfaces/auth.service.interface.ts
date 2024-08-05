import { type DecodedIdToken } from 'firebase-admin/auth';

export interface IAuthService {
  decode_token(token: string): Promise<DecodedIdToken>;
}

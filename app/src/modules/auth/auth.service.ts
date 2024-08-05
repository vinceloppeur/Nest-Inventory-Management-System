import { Injectable } from '@nestjs/common';
import {
  initializeApp,
  cert,
  type App as FirebaseApp,
} from 'firebase-admin/app';
import {
  getAuth,
  type DecodedIdToken,
  type Auth as FirebaseAuth,
} from 'firebase-admin/auth';

import { type IAuthService } from 'app/modules/auth/interfaces/auth.service.interface';
import { firebase_service_account_config } from 'app/configs/firebase.config';

@Injectable()
export class AuthService implements IAuthService {
  private firebase: FirebaseApp;
  private auth: FirebaseAuth;

  public constructor() {
    this.firebase = initializeApp({
      credential: cert(firebase_service_account_config),
    });

    this.auth = getAuth(this.firebase);
  }

  public async decode_token(token: string): Promise<DecodedIdToken> {
    return await this.auth.verifyIdToken(token, true);
  }
}

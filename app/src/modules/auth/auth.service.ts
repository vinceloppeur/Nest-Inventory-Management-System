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

  /* JS async is confusing isn't it */
  public async verify_token(token: string): Promise<void> {
    /*
     * the token verif is an async operation, it also throws an error and it
     * should be awaited here to propagate the error up to the nearest
     * try-catch
     */
    await this.auth.verifyIdToken(token, true);
  }

  public async extract_uid(token: string): Promise<string> {
    const decoded_token: DecodedIdToken = await this.auth.verifyIdToken(token);

    return decoded_token.uid;
  }
}

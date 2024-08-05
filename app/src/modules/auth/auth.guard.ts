import {
  Injectable,
  type ExecutionContext,
  type CanActivate,
} from '@nestjs/common';
import { type Request } from 'express';

import { type IAuthService } from 'app/modules/auth/interfaces/auth.service.interface';
import { AuthService } from 'app/modules/auth/auth.service';
import { UnauthenticatedException } from 'app/modules/auth/exceptions/unauthenticated.exception';
import { DecodedIdToken } from 'firebase-admin/auth';
import { extract_bearer_token } from 'app/lib/utils/extract-bearer-token';
import { ValidationException } from 'app/lib/exceptions/validation.exception';

/*
 * although it's annotated with @Injectable decorator, it should be noted that
 * it must not be registered through the AuthModule. Only register AuthService,
 * and then use this AuthGuard class in a @UseGuards() decorator as a param.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private auth_service: IAuthService;

  public constructor(auth_service: AuthService) {
    this.auth_service = auth_service;
  }

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();

    if (typeof req.headers.authorization === 'undefined') {
      throw new ValidationException(['authorization header must be included']);
    }

    const token: string = extract_bearer_token(req.headers.authorization);

    let decoded: DecodedIdToken;

    try {
      decoded = await this.auth_service.decode_token(token);
    } catch (error) {
      throw new UnauthenticatedException(['ID token invalid']);
    }

    Object.assign(req, { user_id: decoded.uid });

    return true;
  }
}

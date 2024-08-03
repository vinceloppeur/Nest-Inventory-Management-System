import {
  Injectable,
  type ExecutionContext,
  type CanActivate,
} from '@nestjs/common';
import { type Request } from 'express';

import { type IAuthService } from 'app/modules/auth/interfaces/auth.service.interface';
import { AuthService } from 'app/modules/auth/auth.service';
import { UnauthenticatedException } from 'app/modules/auth/exceptions/unauthenticated.exception';

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

    const bearer: string | undefined = req.headers.authorization;

    if (typeof bearer === 'undefined') {
      return false;
    }

    const token: string[] = bearer.split(' ');

    if (token.length !== 2) {
      return false;
    }

    try {
      await this.auth_service.verify_token(token[1]!);
    } catch (error) {
      throw new UnauthenticatedException(['ID token invalid']);
    }

    return true;
  }
}

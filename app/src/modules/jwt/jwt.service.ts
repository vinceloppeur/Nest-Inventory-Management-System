import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'app/configs/constants';
import { CreateTokenRequestDto } from 'app/modules/jwt/dtos/create-token.dto';

@Injectable()
export class JwtService {
  public create_token(request: CreateTokenRequestDto): string {
    return jwt.sign(request.payload, JWT_SECRET, {
      expiresIn: request.expires_in,
      notBefore: request.not_before_time || 0,
    });
  }
}

import { InvalidBearerTokenException } from 'app/lib/exceptions/invalid-bearer-token.exception';

/**
 * @public
 * extract the token from authorization header bearer token
 * @param authorization the authorization header string
 */
export function extract_bearer_token(authorization: string): string {
  const parts: string[] = authorization.split(' ');

  if (parts.length !== 2) {
    throw new InvalidBearerTokenException([
      'authorization header must contain a valid bearer token',
    ]);
  }

  const token: string | undefined = parts[1];

  if (typeof token === 'undefined') {
    throw new InvalidBearerTokenException(['bearer token must be valid']);
  }

  if (token.length === 0) {
    throw new InvalidBearerTokenException(['token of bearer cannot be empty']);
  }

  return token;
}

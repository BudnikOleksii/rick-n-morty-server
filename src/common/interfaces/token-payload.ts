import type { Request } from 'express';

export interface ITokenPayload {
  sub: number;
  email: string;
  roles: string[];
  iat?: any;
  exp?: any;
}

export interface ITokenWithId extends ITokenPayload {
  token: string;
  tokenId: string;
}

export interface IRequestWithToken extends Request {
  user: ITokenWithId;
}

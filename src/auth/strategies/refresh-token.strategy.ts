import type { ITokenPayload } from '../../common/types';
import type { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import serverConfig from '../../../config/server.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.refreshSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: ITokenPayload) {
    const token = req.get('authorization').split(' ')[1];
    const tokenId = req.get('token-id');

    if (!tokenId) {
      return false;
    }

    return { ...payload, token, tokenId };
  }
}

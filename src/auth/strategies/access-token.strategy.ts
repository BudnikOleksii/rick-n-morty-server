import type { ITokenPayload } from '../../common/interfaces';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import serverConfig from '../../../config/server.config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessSecret,
    });
  }

  validate(payload: ITokenPayload) {
    return payload;
  }
}

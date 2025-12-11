import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('secretkey'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, enabled: payload.enabled, isAdmin: payload.isAdmin, resetPwd: payload.resetPwd };
  }

}

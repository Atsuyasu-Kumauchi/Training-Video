import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

@Injectable()
export class JwtActiveAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info) {
        if (err || !user || user.enabled !== true)
            throw err || new UnauthorizedException();

        return user;
    }

}

import { applyDecorators, CanActivate, ExecutionContext,
    Injectable, mixin, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { throwSe } from 'src/common/exception/exception.util';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

@Injectable()
export class VerifyUser implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return context.switchToHttp().getRequest().user?.enabled || throwSe(UnauthorizedException);
    }
}

@Injectable()
export class IsAdmin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return context.switchToHttp().getRequest().user?.isAdmin || throwSe(UnauthorizedException);
    }
}

@Injectable()
export abstract class RoleGuardAbs implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.roles().includes(context.switchToHttp().getRequest().user?.role) || throwSe(UnauthorizedException);
    }
    abstract roles(): string[];
}

export function AllowRoles(...roles: string[]) {
    class RoleGuard extends RoleGuardAbs { roles = () => roles; }
    return applyDecorators(UseGuards(mixin(RoleGuard)));
}

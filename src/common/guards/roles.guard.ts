import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { IRequestWithToken } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get('roles', context.getHandler());
    const request: IRequestWithToken = context.switchToHttp().getRequest();
    const userRoles = request.user.roles;

    return userRoles.some((role) => roles.includes(role));
  }
}

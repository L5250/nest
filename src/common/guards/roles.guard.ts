/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-08 16:30:56
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-08 16:31:25
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      user.roles.some((role: string) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}

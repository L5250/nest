/*
 * @Author: L5250
 * @Description: 本地鉴权
 * @Date: 2022-07-18 15:08:03
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 10:28:12
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, username: string, password: string) {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    // ...
    console.log(contextId, 'contextId');
    console.log(authService);
    // return username;
  }
  // async validate(userName: string, password: string): Promise<any> {
  //   return { userName, password };
  //   // const user = await this.authService.validateUser(username, password);
  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //   // }
  //   // return user;
  // }
}

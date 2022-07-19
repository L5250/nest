/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 09:43:30
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './common/decorators/public.decorator';
@Controller('')
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    // return 123;
    return req.user;
  }
}

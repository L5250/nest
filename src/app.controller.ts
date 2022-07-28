/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-28 15:40:02
 */
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './common/decorators/public.decorator';

@Controller('')
@ApiBearerAuth()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}
  @Get()
  @Public()
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

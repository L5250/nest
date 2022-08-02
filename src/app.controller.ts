/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-29 16:31:55
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
import { ConfigService } from '@nestjs/config';
@Controller('')
@ApiBearerAuth()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private config: ConfigService,
  ) {}

  @Get()
  @Public()
  getHello(): string {
    console.log(this.config);
    console.log(this.config.get('database'));
    console.log(this.config.get('file'));
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

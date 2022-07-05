/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-05 16:46:23
 */
import { Controller, Get, Param, Post, Query, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('')
// @Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() user, @Res({ passthrough: true }) response: Response) {
    response.cookie('token', 'userinfo', { httpOnly: true });
    return user;
  }

  @Get('/demo')
  demofn(): string {
    return 'demo';
  }

  @Get('/:id')
  getById(@Param() param, @Query() quary): object {
    return {
      param,
      quary,
    };
  }
}

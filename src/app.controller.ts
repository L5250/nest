/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 16:18:20
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

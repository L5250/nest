/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:08:20
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 16:17:35
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

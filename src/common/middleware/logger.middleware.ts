/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:23:41
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 11:27:35
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, path } = req;
    Logger.log(`${method}...${path}`);
    next();
  }
}

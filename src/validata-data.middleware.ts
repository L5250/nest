/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-04 11:12:41
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 11:27:16
 */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidataDataMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.cookies.token) {
      next();
    } else {
      // cookie没有token抛出异常
      throw UnauthorizedException;
    }
    // next();
  }
}

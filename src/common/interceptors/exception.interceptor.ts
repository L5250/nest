/*
 * @Author: L5250
 * @Description: 拦截器
 * @Date: 2022-07-14 16:23:41
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-15 10:56:50
 */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          success: true,
          msg: null,
        };
      }),
      // catchError((err) =>
      //   throwError(() => new HttpException(err, HttpStatus.BAD_GATEWAY)),
      // ),
    );
  }
}

/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-08 16:30:56
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-08 16:49:38
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
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 返回数据格式处理
      map((data) => {
        return {
          data,
          success: true,
          errorMessage: '',
        };
      }),
      catchError((err) =>
        throwError(
          () => new HttpException('New message', HttpStatus.BAD_GATEWAY),
        ),
      ),
    );
  }
}

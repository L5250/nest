/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-04 10:48:19
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 10:50:17
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AllResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          success: true,
          errorMessage: '',
        };
      }),
    );
  }
}

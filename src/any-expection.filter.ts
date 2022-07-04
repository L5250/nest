/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-04 10:59:23
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 11:08:22
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AnyExpectionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status,
      time: new Date().toISOString,
      path: request.url,
      errorMessage: exception?.message,
      data: {},
      success: false,
    });
  }
}

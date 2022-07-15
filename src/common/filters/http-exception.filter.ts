/*
 * @Author: L5250
 * @Description: 过滤器（处理失败返回）
 * 直接返回错误
 * throw new HttpException(message, HttpStatus.FORBIDDEN);
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-15 14:49:20
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  // catch(exception: HttpException, host: ArgumentsHost) {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文 response
    const request = ctx.getRequest<Request>(); // 获取请求上下文 request
    const statusCode = exception.getStatus(); // 获取异常状态码
    const name = exception.name;

    // 设置错误信息
    let message = null;
    if (name == 'BadRequestException') {
      message = exception.response.message[0];
    } else {
      message = exception.message
        ? exception.message
        : `${statusCode > 500 ? 'Service Error' : 'Client Error'}`;
    }

    response.status(statusCode).json({
      data: null,
      success: false,
      message,
      name: name,
      statusCode,
      // validMessage: exception,
      // timestamp: new Date().toISOString(),
      // path: request.url,
    });
  }
}

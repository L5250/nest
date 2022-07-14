/*
 * @Author: L5250
 * @Description: 过滤器（处理失败返回）
 * 直接返回错误
 * throw new HttpException(message, HttpStatus.FORBIDDEN);
 * @Date: 2022-07-14 16:04:02
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 17:25:53
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文 response
    const request = ctx.getRequest(); // 获取请求上下文 request
    const statusCode = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${statusCode > 500 ? 'Service Error' : 'Client Error'}`;
    response.status(statusCode).json({
      success: false,
      message,
      // a:response,
      exception: exception,
      statusCode,
      // timestamp: new Date().toISOString(),
      // path: request.url,
    });
  }
}

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 09:41:29
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParse from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ErrorsInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态资源
  app.useStaticAssets(join(__dirname, '../uploads'), {
    prefix: '/uploads',
  });

  app.useGlobalFilters(new HttpExceptionFilter()); // 对所有异常处理
  app.useGlobalInterceptors(new ErrorsInterceptor()); // 使用自定义的全局拦截器
  app.useGlobalPipes(new ValidationPipe()); // 使用dto验证 全局验证管道
  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  // app.useGlobalPipes(new ValidationPipe()); // 使用验证
  // app.use(cookieParse()); // 使用cookies格式化插件

  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('这是接口文档描述')
    .setVersion('1.0')
    .addTag('user', '用户接口')
    .addTag('post', '123')
    .addBearerAuth() // 在控制器加上@ApiBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log('http://localhost:3000/doc');
}
bootstrap();

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 11:37:16
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParse from 'cookie-parser';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AnyExpectionFilter } from './any-expection.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AllResponseInterceptor()); // 使用自定义的全局拦截器
  app.useGlobalPipes(new ValidationPipe()); // 使用验证
  app.useGlobalFilters(new AnyExpectionFilter()); // 对所有异常处理
  app.use(cookieParse()); // 使用cookies格式化插件
  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('这是接口文档描述')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  console.log('访问              http://localhost:3000');
  await app.listen(3000);
}
bootstrap();

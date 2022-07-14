/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 17:00:15
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParse from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ErrorsInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ErrorsInterceptor()); // 使用自定义的全局拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 对所有异常处理
  app.useGlobalPipes(new ValidationPipe()); // 使用dto验证
  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  // app.useGlobalPipes(new ValidationPipe()); // 使用验证
  // app.use(cookieParse()); // 使用cookies格式化插件

  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('这是接口文档描述')
    .setVersion('1.0')
    .addTag('user', '333')
    .addTag('post', '123')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('服务已启动，访问：✈🍪  🍪  🍪  🍪   🍪✈  http://localhost:3000');
  console.log(
    '访问文档    访问：✈🍪  🍪  🍪  🍪   🍪✈  http://localhost:3000/doc',
  );
}
bootstrap();

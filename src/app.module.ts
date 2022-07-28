/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-28 17:08:36
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';
// import { ValidataDataMiddleware } from './validata-data.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // MailerModule.forRootAsync({
    //   useFactory: (config: ConfigService) => config.get('email'),
    //   inject: [ConfigService],
    // }),
    UserModule,
    PostModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    // 全局启用身份验证
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidataDataMiddleware).forRoutes(...['movies']);
//   }
// }

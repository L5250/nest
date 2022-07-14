/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 16:27:30
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
// import { ValidataDataMiddleware } from './validata-data.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidataDataMiddleware).forRoutes(...['movies']);
//   }
// }

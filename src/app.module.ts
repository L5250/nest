/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:12:40
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 11:23:50
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { BooksModule } from './books/books.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidataDataMiddleware } from './validata-data.middleware';

@Module({
  imports: [BooksModule, MoviesModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidataDataMiddleware).forRoutes(...['movies']);
  }
}

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:04:33
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-01 16:50:46
 */

//  npx nest g res 'name' --no-spec
// 快速生成
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class BooksModule {}

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 11:11:39
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-06 11:31:30
 */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}

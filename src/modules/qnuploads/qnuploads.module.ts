/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-08 16:10:08
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-08 16:17:44
 */
import { Module } from '@nestjs/common';
import { QnUploadsService } from './qnuploads.service';
import { QnUploadsController } from './qnuploads.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [QnUploadsController],
  providers: [QnUploadsService, PrismaService],
})
export class QnUploadsModule {}

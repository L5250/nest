/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 15:43:28
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 10:49:02
 */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('file'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}

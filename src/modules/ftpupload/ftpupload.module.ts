/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-05 16:49:00
 */
import { Module } from '@nestjs/common';
import { FtpuploadService } from './ftpupload.service';
import { FtpuploadController } from './ftpupload.controller';
import { FtpModule, FtpService } from 'nestjs-ftp';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    // 获取ftp配置
    FtpModule.forRootFtpAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('ftp'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FtpuploadController],
  providers: [FtpuploadService, PrismaService],
})
export class FtpuploadModule {}

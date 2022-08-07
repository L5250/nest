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
  // imports: [
  //   FtpModule.forRootFtpAsync({
  //     useFactory: async () => {
  //       return {
  //         host: '5250.orgfree.com',
  //         user: '5250.orgfree.com',
  //         password: '915016964luo',
  //         // 此配置会验证证书
  //         // secure: true,
  //       };
  //     },
  //     inject: [ConfigService],
  //   }),
  // ],
  imports: [
    // MulterModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     // 需要在appModule  load引入
    //     ...configService.get('file'),
    //   }),
    //   inject: [ConfigService],
    // }),
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

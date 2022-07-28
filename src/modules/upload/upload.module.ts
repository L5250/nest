/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 15:43:28
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-28 16:59:23
 */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-08 15:54:56
 */
import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFtpuploadDto } from './dto/create-ftpupload.dto';
import { UpdateFtpuploadDto } from './dto/update-ftpupload.dto';
import { FtpService } from 'nestjs-ftp';
import { ConfigService } from '@nestjs/config';
import * as stream from 'stream';
@Injectable()
export class FtpuploadService {
  constructor(
    private readonly _ftpService: FtpService,
    private readonly configService: ConfigService,
  ) {}
  /**
   *
   * @param source 本地文件路径或ReadStream
   * @param destination 服务器目标文件夹
   */
  async ftpUploadAvatar(data: CreateFtpuploadDto, file: any) {
    const content = file.buffer || new Buffer('');
    // 正确的Buffer转ReadStream的写法：
    const bufferStream = new stream.PassThrough();
    const source = bufferStream.end(content);
    const filename = `${new Date().getTime()}.${file.mimetype.split('/')[1]}`;
    try {
      await this._ftpService.upload(
        source,
        // `uploads/${data.id}/avatar/${new Date().getTime()}.${
        //   file.mimetype.split('/')[1]
        // }`,
        `uploads/${filename}`,
      );
    } catch (error) {
      throw new Error(error);
    }

    return process.env.IMAGE_URL + filename;
  }

  async ftpUploadList() {
    console.log(this.configService.get('ftp'));
    const data = await this._ftpService.list();
    console.log(data);
    return data;
  }
}

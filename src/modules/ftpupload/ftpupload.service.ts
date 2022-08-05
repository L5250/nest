/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-05 17:29:07
 */
import { Body, Injectable } from '@nestjs/common';
import { CreateFtpuploadDto } from './dto/create-ftpupload.dto';
import { UpdateFtpuploadDto } from './dto/update-ftpupload.dto';
import { FtpService } from 'nestjs-ftp';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
@Injectable()
export class FtpuploadService {
  constructor(
    private readonly _ftpService: FtpService,
    private readonly configService: ConfigService,
  ) {}
  async ftpUploadAvatar(data: CreateFtpuploadDto, file) {
    console.log(file);
    console.log(data.id);
    console.log(join(__dirname, file.originalname));
    console.log(join());
    // try {
    //   const ad = await this._ftpService.upload(
    //     {
    //       ...file,
    //       once: () => {
    //         console.log(1);
    //       },
    //       removeListener: () => {
    //         console.log(2);
    //       },
    //     },
    //     `${data.id}/avatar/avatar.jpeg`,
    //   );
    //   console.log(ad);
    // } catch (error) {
    //   throw new Error(error);
    // }
    return file;
  }

  async ftpUploadList() {
    console.log(this.configService.get('ftp'));
    const data = await this._ftpService.list();
    console.log(data);
    return data;
  }
}

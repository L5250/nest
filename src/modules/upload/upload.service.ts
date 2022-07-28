/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 15:43:28
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-28 15:45:34
 */
import { Injectable } from '@nestjs/common';
// import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  async downloadAll() {
    const uploadDir = this.configService.get('file').root;
    // const tarStream = new tar.Stream();
    // await tarStream.addEntry(uploadDir);
    // return { filename: 'hello-world.tar', tarStream };
  }
}

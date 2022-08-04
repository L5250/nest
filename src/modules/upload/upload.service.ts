/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 15:43:28
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 12:07:36
 */
import { Body, Injectable } from '@nestjs/common';
// import { tar } from 'compressing';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async uploadAvatar(
    body: { id: any; isAdmin: any },
    file: Express.Multer.File,
  ) {
    const url = `${process.env.IMAGE_URL}/uploads/${file.filename}`;
    console.log(body.id);
    console.log(url);
    const data = await this.prisma.blogUser.update({
      where: { id: body.id },
      data: { avatarUrl: url },
    });
    return data;
  }

  async downloadAll() {
    const uploadDir = this.configService.get('file').root;
    // const tarStream = new tar.Stream();
    // await tarStream.addEntry(uploadDir);
    // return { filename: 'hello-world.tar', tarStream };
  }
}

/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-05 17:29:07
 */
import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFtpuploadDto } from './dto/create-ftpupload.dto';
import { UpdateFtpuploadDto } from './dto/update-ftpupload.dto';
import { FtpService } from 'nestjs-ftp';
import { ConfigService } from '@nestjs/config';
import path, { join, parse } from 'path';
import fs from 'fs';
import * as qiniu from 'qiniu';
import * as url from 'url';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class FtpuploadService {
  constructor(
    private readonly _ftpService: FtpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async ftpUploadAvatar(data: CreateFtpuploadDto, file) {
    const u = 'http://rg8vlo1b5.hn-bkt.clouddn.com/1659597640406.png';
    console.log(data, 'dattt');
    // const user = await this.prisma.blogUser.update({
    //   where: { id: data.id },
    //   data: { avatarUrl: u },
    // });
    // return user;
    /**
     * 上传文件到七牛云
     */
    const mac = new qiniu.auth.digest.Mac(process.env.qn_ak, process.env.qn_sk);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: process.env.qn_scope,
    });
    const uploadToken = putPolicy.uploadToken(mac);
    // uoload
    const formUploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config({
        zone: qiniu.zone.Zone_z2,
      }),
    );
    return new Promise((_res, _rej) => {
      formUploader.put(
        uploadToken,
        `${Date.now()}-${file.originalname}`,
        file.buffer,
        new qiniu.form_up.PutExtra(),
        function (respErr, respBody, respInfo) {
          if (respErr) {
            // console.error(respErr);
            throw new InternalServerErrorException(respErr.message);
          }
          if (respInfo.statusCode == 200) {
            console.log(respBody.key);
            _res({
              // url: new url.URL(respBody.key, process.env.qn_host).href,
              url: `http://${process.env.qn_host}/${respBody.key}`,
            });
          } else {
            // console.error(respInfo.statusCode, respBody);
            throw new InternalServerErrorException(respInfo);
          }
        },
      );
    }).then(async (res: { url: string }) => {
      console.log(res);

      const user = await this.prisma.blogUser.update({
        where: { id: data.id },
        data: { avatarUrl: res.url },
      });
      return { user, url: res.url };
    });
    return file;
  }

  async ftpUploadList() {
    console.log(this.configService.get('ftp'));
    const data = await this._ftpService.list();
    console.log(data);
    return data;
  }
}

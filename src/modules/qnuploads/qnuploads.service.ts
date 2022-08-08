/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-08 16:10:08
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-08 17:31:04
 */
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQnUploadDto } from './dto/create-qnupload.dto';
import { UpdateQnUploadDto } from './dto/update-qnupload.dto';
import * as qn from 'qn';
import * as qiniu from 'qiniu';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QnUploadsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 官方SDK
   * 上传文件到七牛云
   */
  async qiniuUpload(file: Express.Multer.File) {
    const mac = new qiniu.auth.digest.Mac(
      process.env.QINIU_ACCESSKEY,
      process.env.QINIU_SECRETKEY,
    );
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: process.env.QINIU_SCOPE,
    });
    const uploadToken = putPolicy.uploadToken(mac);
    // uoload
    const formUploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config({
        // 华南
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
              // url: new url.URL(respBody.key, process.env.QINIU_HOST).href,
              url: `http://${process.env.QINIU_HOST}/${respBody.key}`,
            });
          } else {
            // console.error(respInfo.statusCode, respBody);
            throw new InternalServerErrorException(respInfo);
          }
        },
      );
    });
  }

  // 社区SDK
  async qnUpload(data: CreateQnUploadDto, file: Express.Multer.File) {
    const fileName = `${data.id}/avatar/avatar.jpeg`;
    const client = qn.create({
      // ak
      accessKey: process.env.QINIU_ACCESSKEY,
      // sk
      secretKey: process.env.QINIU_SECRETKEY,
      // 仓库
      bucket: process.env.QINIU_BUCKET,
      // host
      origin: process.env.QINIU_HOST,
      uploadURL: 'http://up-z2.qiniup.com/',
      // timeout: 3600000, // default rpc timeout: one hour, optional
      // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
      // uploadURL: 'http://up.qiniu.com/',
    });
    client.list(fileName, (error, res) => {
      console.log(res);
      if (res.items && res.items.length > 0) {
        client.delete(fileName, (e) => {
          uu();
        });
      } else {
        uu();
      }
    });
    const uu = () => {
      client.upload(
        file.buffer,
        {
          key: fileName,
        },
        async (err, result) => {
          console.log(result, 'err');
          if (err) {
            throw new HttpException(result.error, HttpStatus.FORBIDDEN);
          } else {
            // 更新user数据
            console.log(result.url);
            this.prisma.blogUser.update({
              where: { id: data.id },
              data: { avatarUrl: result.url },
            });
          }
        },
      );
    };
  }

  // 上传头像
  async qiniuUploadAvatar(data: CreateQnUploadDto, file: Express.Multer.File) {
    // const a: any = await this.qiniuUpload(file);
    this.qnUpload(data, file);
  }
}

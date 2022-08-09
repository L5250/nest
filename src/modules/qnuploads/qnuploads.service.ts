/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-08 16:10:08
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-09 17:39:26
 */
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateQnUploadDto } from './dto/create-qnupload.dto';
import { UpdateQnUploadDto } from './dto/update-qnupload.dto';
// import * as qn from 'qn';
import * as qiniu from 'qiniu';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QnUploadsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 官方SDK
   * 上传文件到七牛云
   */
  async qiniuUpload(data, file: Express.Multer.File) {
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
        // `${Date.now()}-${file.originalname}`,
        `${data.id}/avatar/${new Date().getTime()}.${
          file.mimetype.split('/')[1]
        }`,
        file.buffer,
        new qiniu.form_up.PutExtra(),
        (respErr, respBody, respInfo) => {
          if (respErr) {
            // console.error(respErr);
            throw new InternalServerErrorException(respErr.message);
          }
          console.log(respInfo);
          console.log(respBody);
          if (respInfo.statusCode == 200) {
            console.log(respBody.key);
            const url = `http://${process.env.QINIU_HOST}/${respBody.key}`;
            _res({
              // url: new url.URL(respBody.key, process.env.QINIU_HOST).href,
              url,
            });
            this.updateUser(data, url);
          } else {
            // console.error(respInfo.statusCode, respBody);
            throw new InternalServerErrorException(respInfo);
          }
        },
      );
    });
  }

  // // 社区SDK
  // async qnUpload(data: CreateQnUploadDto, file: Express.Multer.File) {
  //   // const fileName = `${data.id}/avatar/avatar.${file.mimetype.split('/')[1]}?x=${new Date().getTime()}`;
  //   const fileName = `${data.id}/avatar`;
  //   const client = qn.create({
  //     // ak
  //     accessKey: process.env.QINIU_ACCESSKEY,
  //     // sk
  //     secretKey: process.env.QINIU_SECRETKEY,
  //     // scope 一般指文件要上传到的目标存储空间（Bucket）。
  //     // 若为”Bucket”，表示限定只能传到该Bucket（仅限于新增文件）；若为”Bucket:Key”，表示限定特定的文件，可修改该文件。
  //     // 仓库
  //     // 只可以新增，重复会报错
  //     bucket: process.env.QINIU_SCOPE,
  //     /**
  //      * 覆盖上传后更新
  //      */
  //     // bucket: process.env.QINIU_SCOPE + ':' + fileName,
  //     // host
  //     origin: process.env.QINIU_HOST,
  //     uploadURL: 'http://up-z2.qiniup.com/',
  //     // timeout: 3600000, // default rpc timeout: one hour, optional
  //   });

  //   return new Promise((_res, _rej) => {
  //     client.list(fileName, (error, res) => {
  //       if (res.items && res.items.length > 0) {
  //         // 删除上一张的图片
  //         client.delete(res.items[0].key, (e) => {
  //           // 新增一张
  //           uu();
  //         });
  //       } else {
  //         uu();
  //       }
  //     });
  //     const uu = () => {
  //       client.upload(
  //         file.buffer,
  //         {
  //           // key: fileName,
  //           key: `${fileName}/${new Date().getTime()}.${
  //             file.mimetype.split('/')[1]
  //           }`,
  //         },
  //         async (err, result) => {
  //           console.log(result, 'err');
  //           if (err) {
  //             throw new HttpException(result.error, HttpStatus.FORBIDDEN);
  //           } else {
  //             // 更新user数据
  //             console.log(result.url);
  //             await this.updateUser(data, `http://${result.url}`);
  //             _res(true);
  //           }
  //         },
  //       );
  //     };
  //   });
  // }

  async updateUser(data: CreateQnUploadDto, url: string) {
    console.log(data, url);
    const a = await this.prisma.blogUser.update({
      where: { id: data.id },
      data: { avatarUrl: url },
    });
    console.log(a);
  }

  // 上传头像
  async qiniuUploadAvatar(data: CreateQnUploadDto, file: Express.Multer.File) {
    // 返回一个promise在上传完毕后刷新头像
    const a: any = await this.qiniuUpload(data, file);
    // const a = await this.qnUpload(data, file);
    console.log(a);
  }
}

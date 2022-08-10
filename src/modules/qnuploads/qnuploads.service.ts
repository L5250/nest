/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-08 16:10:08
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-10 15:56:48
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

// 定义七牛云上传配置
const accessKey = process.env.QINIU_ACCESSKEY;
const secretKey = process.env.QINIU_SECRETKEY;
const bucket = process.env.QINIU_SCOPE;
const options = {
  scope: bucket,
};
// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac：
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config({
  // 华南
  zone: qiniu.zone.Zone_z2,
});
// uoload
const formUploader = new qiniu.form_up.FormUploader(config);

// 资源管理相关的操作首先要构建BucketManager对象：
// const config: any = new qiniu.conf.Config();
// config.zone = qiniu.zone.Zone_z2;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

@Injectable()
export class QnUploadsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取文件
   * @param prefix 查找的文件前缀--${id}/avatar
   * @param limit
   * @returns items 文件集合
   */
  getlist = async (prefix: string, limit = 10) => {
    return new Promise((_res: any, _rej: any) => {
      // 获取指定前缀的文件列表
      const options = {
        limit,
        prefix,
      };
      bucketManager.listPrefix(
        bucket,
        options,
        function (err, respBody, respInfo) {
          if (err) {
            console.log(err);
            throw err;
          }
          if (respInfo.statusCode == 200) {
            const items = respBody.items;
            _res(items);
          } else {
            throw new HttpException(respBody, respInfo.statusCode);
          }
        },
      );
    });
  };

  delete = async (key) => {
    return new Promise((_res) => {
      bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException(err);
        }
        if (respInfo.statusCode == 200) {
          _res(true);
        } else {
          throw new HttpException(respBody, respInfo.statusCode);
        }
      });
    });
  };
  /**
   * 上传文件
   * @param filename 上传的文件名称
   * @param file
   * @returns url
   */
  upload = async (filename: string, file: Express.Multer.File) => {
    return new Promise(async (_res, _rej) => {
      formUploader.put(
        uploadToken,
        filename,
        file.buffer,
        new qiniu.form_up.PutExtra(),
        (respErr, respBody, respInfo) => {
          if (respErr) {
            throw new InternalServerErrorException(respErr.message);
          }
          if (respInfo.statusCode == 200) {
            const url = `http://${process.env.QINIU_HOST}/${respBody.key}`;
            _res(url);
          } else {
            throw new InternalServerErrorException(respInfo);
          }
        },
      );
    });
  };

  /**
   * 官方SDK
   * 上传文件到七牛云
   */
  async qiniuUpload(data, file: Express.Multer.File) {
    // 文件前缀
    const key = `${data.id}/avatar`;
    // 文件名
    const filename = `${key}${new Date().getTime()}.${
      file.mimetype.split('/')[1]
    }`;
    const list: any = await this.getlist(key);
    console.log(list);
    if (list && list.length > 0) {
      //
      await this.delete(list[0].key);
      return await this.upload(filename, file);
    } else {
      return await this.upload(filename, file);
    }

    // this.updateUser(data, url);
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
    return a;
  }

  // 上传头像
  async qiniuUploadAvatar(data: CreateQnUploadDto, file: Express.Multer.File) {
    // 返回一个promise在上传完毕后刷新头像
    const url: any = await this.qiniuUpload(data, file);
    // const a = await this.qnUpload(data, file);
    await this.updateUser(data, url);
  }
}

/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-28 15:43:28
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-04 10:53:21
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@Controller('upload')
@ApiTags('upload') // 接口分类
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  /**
   * 上传头像文件
   * @param file
   */
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post('/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传头像图片',
    type: FileUploadDto,
  })
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    console.log(file, 'file');
    // 这里的 file 已经是保存后的文件信息了，在此处做数据库处理，或者直接返回保存后的文件信息
    return this.uploadService.uploadAvatar(body, file);
  }

  @Get('export')
  async downloadAll(@Res() res: Response) {
    // const { filename, tarStream } = await this.uploadService.downloadAll();
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    // tarStream.pipe(res);
  }
}

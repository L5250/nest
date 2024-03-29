/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-05 15:47:47
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { FtpuploadService } from './ftpupload.service';
import { CreateFtpuploadDto } from './dto/create-ftpupload.dto';
import { UpdateFtpuploadDto } from './dto/update-ftpupload.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('FTP上传文件')
@Controller('ftpupload')
export class FtpuploadController {
  constructor(private readonly ftpuploadService: FtpuploadService) {}

  @Public()
  @ApiOperation({ summary: '上传头像图片' }) // 文档上的接口描述
  @UseInterceptors(FileInterceptor('file'))
  @Post('/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传头像图片',
    type: FileUploadDto,
  })
  uploadAvatar(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    return this.ftpuploadService.ftpUploadAvatar(data, file);
  }

  @Public()
  @Post('/getList')
  getList() {
    return this.ftpuploadService.ftpUploadList();
  }
}

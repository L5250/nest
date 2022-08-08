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
} from '@nestjs/common';
import { QnUploadsService } from './qnuploads.service';
import { CreateQnUploadDto } from './dto/create-qnupload.dto';
import { UpdateQnUploadDto } from './dto/update-qnupload.dto';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('上传文件到七牛云')
@Controller('qnuploads')
export class QnUploadsController {
  constructor(private readonly qnUploadService: QnUploadsService) {}

  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post('/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传头像图片',
    type: FileUploadDto,
  })
  uploadAvatar(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    return this.qnUploadService.qiniuUploadAvatar(data, file);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateFtpuploadDto } from './create-ftpupload.dto';

export class UpdateFtpuploadDto extends PartialType(CreateFtpuploadDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateQnUploadDto } from './create-qnupload.dto';

export class UpdateQnUploadDto extends PartialType(CreateQnUploadDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQnUploadDto {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ description: '头像图片' })
  @IsNotEmpty()
  readonly file: any;
}

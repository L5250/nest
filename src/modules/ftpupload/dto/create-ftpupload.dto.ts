/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-08-05 15:08:29
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-05 15:13:51
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFtpuploadDto {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ description: '头像图片' })
  @IsNotEmpty()
  readonly file: any;
}

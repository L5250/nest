/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 11:11:39
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-06 11:14:25
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePostDto {
  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty({ message: 'title不能为空' })
  title: string;

  @ApiProperty({
    description: 'content',
  })
  @IsNotEmpty({ message: 'content不能为空' })
  content: string;

  @ApiProperty({
    description: 'imageUrl',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'imageUrlBase64',
  })
  imageUrlBase64: string;

  @ApiProperty({
    description: 'remark',
  })
  remark: string;
}

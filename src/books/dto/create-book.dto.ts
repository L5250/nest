import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:04:33
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 10:57:33
 */
export class CreateBookDto {
  @ApiProperty({
    name: 'title',
    description: '书名',
  })
  @IsNotEmpty({ message: '书名不能为空' })
  title: string;
  @ApiProperty({
    name: 'author',
    description: '作者',
  })
  author: string;
  @ApiProperty({
    name: 'price',
    description: '价格',
  })
  price: number;
}

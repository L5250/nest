/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:04:33
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 10:44:27
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    name: 'title',
    description: '书名',
  })
  name: string;
}

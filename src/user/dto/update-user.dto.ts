/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-15 09:37:23
 */
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

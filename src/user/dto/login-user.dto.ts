/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:49:36
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 17:18:40
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '名字', required: true, example: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

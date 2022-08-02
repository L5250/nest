/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-14 16:49:36
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-02 16:29:10
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '名字', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

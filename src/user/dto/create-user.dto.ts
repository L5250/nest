/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 17:10:50
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: 'email' })
  readonly email: string;

  @ApiProperty({ description: 'passwordHash' })
  readonly passwordHash: string;

  @ApiProperty({ description: 'avatarUrl' })
  readonly avatarUrl: string;

  @ApiProperty({ description: 'avatarUrlBase64' })
  readonly avatarUrlBase64: string;

  @ApiProperty({ description: 'telephone' })
  readonly telephone: string;

  @ApiProperty({ description: '是否管理员', default: false })
  readonly isAdmin: boolean;
}

/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-06 15:38:26
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  password: string;

  @ApiProperty({
    description: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'passwordHash',
  })
  passwordHash: string;

  @ApiProperty({
    description: 'avatarUrl',
  })
  avatarUrl: string;

  @ApiProperty({
    description: 'avatarUrlBase64',
  })
  avatarUrlBase64: string;

  @ApiProperty({
    description: 'telephone',
  })
  telephone: string;

  @ApiProperty({
    description: '是否管理员',
    default: false,
  })
  isAdmin: boolean;
}

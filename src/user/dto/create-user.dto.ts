/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 17:10:48
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiPropertyOptional({ description: 'email' })
  readonly email: string;

  @ApiProperty({ description: 'passwordHash' })
  readonly passwordHash: string;

  @ApiProperty({ description: 'avatarUrl' })
  readonly avatarUrl: string;

  @ApiProperty({ description: 'avatarUrlBase64' })
  readonly avatarUrlBase64: string;

  @ApiPropertyOptional({ description: 'telephone' })
  readonly telephone: string;

  @ApiProperty({ description: '是否管理员', default: false })
  readonly isAdmin: boolean;
}

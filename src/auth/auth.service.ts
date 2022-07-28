/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-18 11:18:07
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-28 11:03:33
 */
/*
 * @Author: L5250
 * @Description: desc
 * @Date: 2022-07-18 11:18:07
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 17:06:04
 */
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';
import { UserService } from 'src/modules/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  /**
   * 验证用户账号密码
   * @param e
   * @returns
   */
  async validateUser(e: LoginUserDto): Promise<any> {
    const { userName, password } = e;
    const user = await this.prisma.blogUser.findUnique({ where: { userName } });
    if (!user) {
      throw new HttpException('用户不存在', 403);
    }
    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      return user;
    }
    throw new HttpException('验证账号密码', 403);
  }

  async login(e: LoginUserDto) {
    if (!e.userName || !e.password) {
      throw new HttpException('账号密码不能为空', 403);
    }
    const data = await this.validateUser(e);
    const payload = { userName: data.userName, userId: data.id };
    return {
      access_token: this.jwtService.sign(payload),
      userInfo: data,
    };
  }
}

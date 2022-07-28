/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-21 17:21:11
 */
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
export type User = any;
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /*
   获取所有用户 
  */
  async findAll() {
    return this.prisma.blogUser.findMany({ where: {} });
  }

  /*
   获取单个用户 byName
  */
  async getUserByName(userName: string) {
    const data = await this.prisma.blogUser.findUnique({ where: { userName } });
    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
    }
    return data;
  }
  /*
  获取单个用户 byId
  */
  async findOne(id: string) {
    const data = await this.prisma.blogUser.findUnique({ where: { id } });
    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
    }
    return data;
  }

  /*
   注册 
  */
  async register(body: CreateUserDto) {
    const data = await this.prisma.blogUser.findUnique({
      where: { userName: body.userName },
    });
    console.log(data);
    if (data) {
      throw new HttpException('用户已经存在', HttpStatus.FORBIDDEN);
    } else {
      // 生成hash密码
      const password = body.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const c = this.prisma.blogUser.create({
        data: { isAdmin: false, ...body, password: hash },
      });
      return c;
    }
  }
  /*
   更新用户信息 
  */
  async update(body: UpdateUserDto) {
    await this.findOne(body.id);
    // 生成hash密码
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.prisma.blogUser.update({
      where: { id: body.id },
      data: { ...body, password: hash },
    });
  }
  /*
   删除账号 
  */
  async remove(id: string) {
    console.log(id);
    // return id;
    const data = await this.findOne(id);
    console.log(data);
    if (!data) {
      return data;
    } else {
      return this.prisma.blogUser.delete({ where: { id } });
    }
  }
  // /*
  //  登录
  //  */
  // async login(body: LoginUserDto) {
  //   const data = await this.getUserByName(body.userName);
  //   const password = body.password;
  //   const hash = data.password;
  //   const isMatch = await bcrypt.compare(password, hash);
  //   if (!isMatch) {
  //     throw new HttpException('验证密码账号', HttpStatus.FORBIDDEN);
  //   }
  //   return data;
  // }
  /**
   * 保存个人信息
   */
  async saveUserInfo(body: UpdateUserDto) {
    const data = await this.update(body);
    console.log(data);
    return data;
  }
}

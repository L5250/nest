/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-15 17:29:57
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.blogUser.findMany({ where: {} });
  }
  // 获取单个user
  async getUserByName(userName: string) {
    const data = await this.prisma.blogUser.findUnique({ where: { userName } });
    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
    }
    return data;
  }
  async findOne(id: string) {
    const data = await this.prisma.blogUser.findUnique({ where: { id } });
    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
    }
    return data;
  }
  // 注册
  async register(createUserDto: CreateUserDto) {
    const data = await this.prisma.blogUser.findUnique({
      where: { userName: createUserDto.userName },
    });
    console.log(data);
    if (data) {
      throw new HttpException('用户已经存在', HttpStatus.FORBIDDEN);
    } else {
      console.log(createUserDto);
      // return createUserDto;
      const c = this.prisma.blogUser.create({
        data: createUserDto,
      });
      console.log(c);
      return c;
    }
  }
  // 更新信息
  async update(updateUserDto: UpdateUserDto) {
    await this.findOne(updateUserDto.id);
    return this.prisma.blogUser.update({
      where: { id: updateUserDto.id },
      data: updateUserDto,
    });
  }
  // 删除账号
  async remove(id: string) {
    console.log(id);
    // return id;
    const data = await this.findOne(id);
    if (!data) {
      return data;
    } else {
      return this.prisma.blogUser.delete({ where: { id } });
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const data = await this.getUserByName(loginUserDto.userName);
    if (data && data.password !== loginUserDto.password) {
      throw new HttpException('验证密码账号', HttpStatus.FORBIDDEN);
    }
    return data;
  }
}

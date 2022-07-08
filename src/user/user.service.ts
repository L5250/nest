/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-08 11:39:48
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.blogUser.findMany({ where: {} });
  }
  // 获取单个user
  async getUserByName(userName: string) {
    return this.prisma.blogUser.findUnique({ where: { userName } });
  }
  // 注册
  async register(createUserDto: CreateUserDto) {
    return this.prisma.blogUser.create({
      data: createUserDto,
    });
  }
  // 更新信息
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.blogUser.update({
      where: { id },
      data: updateUserDto,
    });
  }
  // 删除账号
  async remove(id: string) {
    return this.prisma.blogUser.delete({ where: { id } });
  }
  async login(params: any) {
    if (!params.password) {
      return false;
    }
    const data = await this.getUserByName(params.userName);
    if (data.password !== params.password) {
      throw new HttpException('验证密码账号', HttpStatus.FORBIDDEN);
      return false;
    }
    return data;
  }
}

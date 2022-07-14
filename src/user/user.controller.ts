/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-14 17:01:25
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user') // 接口分类
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取所有用户' }) // 文档上的接口描述
  @Get('getAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '根据名字获取用户信息' })
  @Get('/getUserByName')
  getUserByName(@Param('userName') userName: string) {
    return this.userService.getUserByName(userName);
  }

  @ApiOperation({ summary: '注册-创建新账号' })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email) {
      return false;
    }
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Post('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @ApiOperation({ summary: '登录' })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @ApiOperation({ summary: '删除账号' })
  @Delete('/delete')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

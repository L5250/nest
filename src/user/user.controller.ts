/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-19 16:47:09
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user') // 接口分类
// @UseGuards(LocalAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Post('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({ summary: '登录' })
  @Post('/login')
  @Public()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: '删除账号' })
  @Post('/delete')
  remove(@Body('id') id: string) {
    console.log(id);
    // return id;
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: '验证token是否过期' })
  @Get('/validateToken')
  validateToken(@Request() req) {
    console.log(req.user.userName);
    // 未过期
    if (req.user) {
      return this.userService.findOne(req.user.userId);
    }
  }
}

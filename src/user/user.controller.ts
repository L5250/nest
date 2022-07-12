/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 10:20:55
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-11 11:56:19
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getAllUsers')
  findAll() {
    return this.userService.findAll();
  }
  @Get('/getUserByName')
  getUserByName(@Param('userName') userName: string) {
    return this.userService.getUserByName(userName);
  }
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email) {
      throw new HttpException('验证密码账号', HttpStatus.FORBIDDEN);
      return false;
    }
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() params: object) {
    return this.userService.login(params);
  }
  @Post('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete('/delete')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

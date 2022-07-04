/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:29:26
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-01 16:47:27
 */
// npx g -h 帮助
// 创建控制器（service）-- npx g co 'name' --no-spec
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  loadData() {
    return {
      params: 'user',
    };
  }

  @Get('/getData')
  loadAll() {
    return this.userService.loadAll();
  }

  @Get(':id')
  loadById(@Param() param) {
    // return param;
    return this.userService.loadById(param.id);
  }
}

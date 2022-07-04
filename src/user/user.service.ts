/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 15:49:39
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-01 16:03:20
 */
// 创建服务（service）-- npx g s 'name' --no-spec
// --no-spec(不生成测试文件)
import { Injectable } from '@nestjs/common';

const people = [
  {
    id: 1,
    name: 'user-1',
  },
  {
    id: 2,
    name: 'user-2',
  },
  {
    id: 3,
    name: 'user-3',
  },
  {
    id: 4,
    name: 'user-5',
  },
];

@Injectable()
export class UserService {
  loadAll() {
    return people;
  }

  loadById(id) {
    return people.find((e) => e.id == id);
  }
}

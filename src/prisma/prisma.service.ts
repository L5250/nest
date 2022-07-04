/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:45:15
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-04 09:33:14
 */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

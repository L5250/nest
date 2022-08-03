/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:45:15
 * @LastEditors: L5250
 * @LastEditTime: 2022-08-03 09:50:23
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

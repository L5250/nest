/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-01 16:08:48
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-01 16:10:14
 */
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

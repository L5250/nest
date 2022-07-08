/*
 * @Author: L5250
 * @Description:
 * @Date: 2022-07-06 11:11:39
 * @LastEditors: L5250
 * @LastEditTime: 2022-07-06 11:16:35
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prismaService.blogPost.create({
      data: createPostDto,
    });
  }
  findAll() {
    return this.prismaService.blogPost.findMany({ where: {} });
  }

  findOne(id: string) {
    return this.prismaService.blogPost.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prismaService.blogPost.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: string) {
    return this.prismaService.blogPost.delete({ where: { id } });
  }
}

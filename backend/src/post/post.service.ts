import { Injectable } from '@nestjs/common';
import { existsSync, mkdir, writeFile } from 'fs-extra';
import { join } from 'path';

import { PrismaService } from '../prisma.service';

import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: PostDto, userId: string, files: string[]) {
    return this.prisma.post.create({
      data: {
        userId,
        images: files,
        ...dto,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

import { RegisterDto } from '../auth/dto/register.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(dto: RegisterDto, avatarUrl: string) {
    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await hash(dto.password),
        avatar: avatarUrl,
      },
    });
  }
}

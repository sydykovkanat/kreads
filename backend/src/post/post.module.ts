import { Module } from '@nestjs/common';

import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { PrismaService } from '../prisma.service';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, AwsS3Service],
})
export class PostModule {}

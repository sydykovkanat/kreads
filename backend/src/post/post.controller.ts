import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Auth } from '../auth/decorators/auth.decorator';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { CurrentUser } from '../user/decorators/current-user.decorator';

import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly awsService: AwsS3Service,
  ) {}

  @Get()
  async getAll() {
    return this.postService.getAll();
  }

  @Auth()
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: PostDto,
    @UploadedFiles() files: Express.MulterS3.File[],
  ) {
    const uploadedFiles = await this.awsService.uploadFiles(files);
    const formatedFiles = uploadedFiles
      .map((file) => file?.Location)
      .filter((location) => location !== undefined);

    return this.postService.create(dto, userId, formatedFiles);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  private readonly AWS_S3_BUCKET: string;
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow<string>(
        'AWS_SECRET_ACCESS_KEY',
      ),
    });
  }

  async uploadFiles(files: Express.MulterS3.File[]) {
    const uploadPromises = files.map((file) =>
      this.s3_upload(
        file.buffer,
        this.AWS_S3_BUCKET,
        file.originalname,
        file.mimetype,
      ),
    );

    return await Promise.all(uploadPromises);
  }

  async uploadFile(file: Express.MulterS3.File) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(
    file: Buffer<ArrayBuffer>,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.getOrThrow<string>('AWS_REGION'),
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}

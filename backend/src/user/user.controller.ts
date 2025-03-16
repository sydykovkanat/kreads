import { Controller, Get, Param } from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';

import { CurrentUser } from './decorators/current-user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('/profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }
}

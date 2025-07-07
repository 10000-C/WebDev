import { Controller, Get, Post, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/')
  async createUser() {
    return this.userService.createUser('John', 20);
  }

  @Get('/')
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
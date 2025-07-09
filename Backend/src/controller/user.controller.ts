import { Controller, Post, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { Context } from '@midwayjs/koa';
import * as bcrypt from 'bcryptjs';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;
  @Post('/register')
  async createUser() {
    const params = this.ctx.request.body as{
      name: string;
      email: string;
      password: string;
    };
    
    const temp = await this.userService.getUserByName(params.name);
    if(temp !== null) {
      return { success: false, message: 'User already exists' };
    }

    this.userService.createUser(params.name, params.password, params.email, 'user');
    //const data = await this.userService.returnUserData(user);
    return { success: true, message: 'OK'};
  }

  @Post('/login')
  async login() {
    const params = this.ctx.request.body as {
      name: string;
      password: string;
      email: string;
    };

    const user = await this.userService.getUserByName(params.name);
    if(user === null)
      return { success: false, message: 'User does not exist' };
    
    const isCorrect = bcrypt.compare(params.password, user.password);
    if(isCorrect) {
      const data = this.userService.returnUserData(user);
      return{success: true, message: 'OK', data};
    }
    else return {success: false, message: 'Password is incorrect'};
  }
}
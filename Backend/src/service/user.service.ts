import {  Provide, Inject } from '@midwayjs/core';
import {  Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  @InjectEntityModel(User)  
  entityManager: Repository<User>;;
  @Inject()
  jwt : JwtService;
  // 创建用户
  async createUser(name: string, password: string, email: string, role: string) {
    password = await bcrypt.hash(password, 10);
    
    const user = new User();
    user.name = name;
    user.password = password;
    user.email = email;
    user.role = role;
    return this.entityManager.save(user);
  }

  async getUserByName(name: string) {
    return this.entityManager.findOne({
      where: {
        name: name,
      }
    });
  }
  
  async getUserByEmail(email: string) {
    return this.entityManager.findOne({
      where: {
        email: email,
      }
    });
  }
async returnUserData(user: User) {
  const token = await this.jwt.sign(
    {
      id: user.id, // 用户唯一ID（最重要！）
      
      name: user.name, // 用户名（用于显示）
      role: user.role, // 用户角色
      
      // 系统信息（可选）
      iat: Math.floor(Date.now() / 1000), // 签发时间
    },
    { expiresIn: '2h' } // 有效期
  );

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    token: token,
  };
}
}
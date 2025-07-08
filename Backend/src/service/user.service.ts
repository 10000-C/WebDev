import { Inject, Provide } from '@midwayjs/core';
//import { InjectEntityManager } from '@midwayjs/typeorm';
import {  EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Provide()
export class UserService {
  @Inject()
  entityManager: EntityManager;

  // 创建用户
  async createUser(name: string, password: string, role: string) {
    password = await bcrypt.hash(password, 10);
    
    const user = new User();
    user.name = name;
    user.password = password;
    user.role = role;
    return this.entityManager.save(User, user);
  }

  async getUserByName(name: string) {
    return this.entityManager.findOne(User, {
      where: {
        name: name,
      }
    });
  }
  
async returnUserData(user: User) {
  const token = jwt.sign(
    {
      id: user.id, // 用户唯一ID（最重要！）
      
      name: user.name, // 用户名（用于显示）
      role: user.role, // 用户角色
      
      // 系统信息（可选）
      iat: Math.floor(Date.now() / 1000), // 签发时间
    },
    process.env.JWT_SECRET, // 密钥（必须从环境变量获取）
    { expiresIn: '2h' } // 有效期
  );

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    token
  };
}
}
import { Inject, Provide } from '@midwayjs/core';
//import { InjectEntityManager } from '@midwayjs/typeorm';
import {  EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @Inject()
  entityManager: EntityManager;

  // 创建用户
  async createUser(name: string, age: number) {
    const user = new User();
    user.name = name;
    user.age = age;
    return this.entityManager.save(User, user);
  }

  // 查询所有用户
  async getAllUsers() {
    return this.entityManager.find(User);
  }
}
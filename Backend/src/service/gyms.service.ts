import {  Provide, Inject } from '@midwayjs/core';
import {  Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Gym } from '../entity/gyms.entity';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class GymService {
  @InjectEntityModel(Gym)  
  entityManager: Repository<Gym>;
  @Inject()
  jwt : JwtService;

  async getGymInfo(gid: number) {
        if(gid === null)
          return await this.entityManager.find();
        return await this.entityManager.findOne({where: {id: gid}});
  }

  async createGym(name: string, description: string, location: string, price: string, image: string, rating: number) {
    const gym = new Gym();
    gym.name = name;
    gym.description = description;
    gym.location = location;
    gym.price = price;
    gym.image = image;
    gym.rating = rating;
    return await this.entityManager.save(gym);
  }

  async delGym(gid: number) {
    return await this.entityManager.delete(gid);
  }
}
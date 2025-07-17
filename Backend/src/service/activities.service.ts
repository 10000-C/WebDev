import {  Provide, Inject } from '@midwayjs/core';
import {  Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Activity } from '../entity/activities.entity';
import { JwtService } from '@midwayjs/jwt';


@Provide()
export class ActivityService {
  @InjectEntityModel(Activity)  
  entityManager: Repository<Activity>;
  @Inject()
  jwt : JwtService;

  async getActivityInfo(aid: number) {
        if(aid === null)
          return await this.entityManager.find();
        return await this.entityManager.findOne({where: {id: aid}});
  }

  async createActivity(data: any) {
    const activity = new Activity();
    activity.name = data.name;
    activity.description = data.description;
    activity.location = data.location;
    activity.date = data.date;
    activity.price = data.price;
    activity.currentParticipants = 0;
    activity.participantList = [];
    activity.maxParticipants = data.maxParticipants;
    return await this.entityManager.save(activity);
  }

  async delActivity(aid: number) {
    return await this.entityManager.delete(aid);
  }

  async searchActivity(keyword: string) {
    return await this.entityManager.createQueryBuilder('activity')
      .where('activity.name LIKE :keyword OR activity.description LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  async updateActivity(activity: Activity) {
    return await this.entityManager.save(activity);
  }

  async isExisted(activity: Activity, uid: number) { 
    const existedParticipants = activity.participantList;
    if(existedParticipants === null || existedParticipants.length === 0) {
      return false;
    }
    for(const cuUid of existedParticipants) {
      if(cuUid == uid) {
          return true;
      }
    }
    return false;    
  }
}
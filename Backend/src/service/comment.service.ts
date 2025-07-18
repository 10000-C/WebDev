import {  Provide } from '@midwayjs/core';
import {  Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Comment } from '../entity/comment.entity';

interface CommentData {
  content: string;
  time?: string;    
  uid?: number;   
  aid: number; 
  username: string;
}


@Provide()
export class CommentService {
  @InjectEntityModel(Comment)  
  entityManager: Repository<Comment>

  async createComment(data: CommentData) {
    const comment = new Comment();
    comment.content = data.content;
    comment.uid = data.uid;
    comment.aid = data.aid;
    comment.time = data.time;
    comment.username = data.username;
    return await this.entityManager.save(comment);
  }

  async getCommentsByUid(aid: number, uid: number) {
        return await this.entityManager.findOne({
        where: {
            aid: aid,
            uid: uid,
        },
        });
  }
  
  async getAllComments(aid: number) {
    return await this.entityManager.find({
      where: {
        aid: aid,
      },
      order: {
        time: 'DESC',
      },
    });
  }  
}
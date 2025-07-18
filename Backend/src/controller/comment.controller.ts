import { Controller, Post, Inject, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CommentService } from '../service/comment.service';

interface CommentData {
  content: string;
  time?: string;    
  uid?: number; 
  aid: number;   
  username: string;
}

@Controller('/comment')
export class ActivitiesController { 

    @Inject()
    ctx : Context;
    @Inject()
    commentService: CommentService;

    @Post('/create')
    async createComment() {
        const data: CommentData = this.ctx.request.body as { 
            content: string,
            aid : number,
            username: string,
        };
        this.ctx.logger.info('创建评论请求:', data);
        if(data.aid === undefined) return { success: false, message: 'Invalid request: Aid is required', data: null };
        data.time = new Date().toISOString();
        data.uid = this.ctx.state.user?.id;
        await this.commentService.createComment(data);
        return { success: true, message: 'Comment created successfully', data: null };
    }
    
    @Get('/info')
    async getCommentInfo(@Query('aid') aid: number, @Query('uid') uid?: number) {
        if(aid === undefined || aid === null) {
            return { success: false, message: 'Activity ID is required', data: null };
        }
        if(uid === undefined || uid === null) {
            this.ctx.logger.info('No uid provided, retrieving all comments');
            const comments = await this.commentService.getAllComments(aid);
            return { success: true, message: 'All comments retrieved', data: comments };
        }
        const comments = await this.commentService.getCommentsByUid(aid,uid);
        this.ctx.logger.info(`Retrieving comment of user ${uid} for activity ${aid}`);
        return { success: true, message: 'Comments retrieved successfully', data: comments };
    }
}
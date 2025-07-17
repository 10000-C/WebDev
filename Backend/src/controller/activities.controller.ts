import { Controller, Post, Inject, Get, Del, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ActivityService } from '../service/activities.service';
import { Mutex } from 'async-mutex';

@Controller('/activities')
export class ActivitiesController { 

    @Inject()
    ctx : Context;
    @Inject()
    activityService: ActivityService;

    private applyActivityMutex = new Mutex();
    @Get('/application')
    async applyActivity(@Query('aid') aid: number) {
        return await this.applyActivityMutex.runExclusive(async () => {
        const uid = this.ctx.state.user?.id;
        if (uid === undefined || uid === null) {
            return { success: false, message: 'User not logged in' };
        }
        const activity = await this.activityService.getActivityInfo(aid);
        if (!activity) {
            return { success: false, message: 'Activity not found' };
        }
        if(Array.isArray(activity)) {
            return { success: false, message: 'Invalid activity ID' };
        }    

        const isParticipant = await this.activityService.isExisted(activity, uid);
        
        if (isParticipant) {
            this.ctx.logger.info(`User ${uid} is already a participant of activity ${aid}`);
            return { success: false, message: 'User is already a participant' };
        }
        if (activity.currentParticipants >= activity.maxParticipants) {
            return { success: false, message: 'Activity is full' };
        }

        this.ctx.logger.info(`User ${uid} applied for activity ${aid}`);
        activity.currentParticipants += 1;
        activity.participantList.push(uid);
        await this.activityService.updateActivity(activity);

        return { success: true, message: 'Applied successfully' };
    });
    }

    @Post('/create')
    async createActivity() {
        const data = this.ctx.request.body as {
            name: string;
            description: string;
            location: string;
            price: string;
            date: string;
            maxParticipants: number;
            participantList: [];
        };
        await this.activityService.createActivity(data);
        return { success: true, message: 'OK', data: null };
    }

    @Post('/update')
    async updateActivity() {
        // This method will be implemented later
        return { success: true, message: 'Gym update not implemented yet', data: null };
    }

    @Del('/del')
    async delActivity(@Query('aid') aid: number) {
        if(!aid) {
            return { success: false, message: 'Activity ID is required', data: null };
        }
        const result = await this.activityService.delActivity(aid);
        if(result.affected === 0) 
            return { success: false, message: 'Activity not found or already deleted', data: null};
        return { success: true, message: 'Activity '+aid+' is deleted', data: null };
    }

    @Get('/info')
    async searchActivity(@Query('keyword') keyword?: string, @Query('aid') aid?: number) {
        if(aid !== undefined && aid !== null) {
            const data = await this.activityService.getActivityInfo(aid);
            if(data === null) {
                this.ctx.logger.info('Activity not found');
                return { success: false, message: 'Activity not found', data: null };
            }
            this.ctx.logger.info(`Activity info retrieved for ID: ${aid}`);
            return { success: true, message: 'Activity info retrieved', data: data };
        }
        if(keyword === null || keyword === '' || keyword === undefined) {
            this.ctx.logger.info('No keyword provided, retrieving all gyms');
            const data = await this.activityService.getActivityInfo(null);
            return { success: true, message: 'All gyms retrieved', data: data };
        }
        const data = await this.activityService.searchActivity(keyword);
        this.ctx.logger.info(`Search gyms with keyword: ${keyword}`);
        if(data.length === 0) 
            return { success: false, message: 'No results found', data: null};
        return { success: true, message: 'Search results for keyword: '+keyword, data: data}
    }
}
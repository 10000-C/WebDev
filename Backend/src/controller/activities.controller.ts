import { Controller, Post, Inject, Get, Del, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ActivityService } from '../service/activities.service';

@Controller('/activities')
export class ActivitiesController { 

    @Inject()
    ctx : Context;
    @Inject()
    activityService: ActivityService;


    @Post('/create')
    async createActivity() {
        const data = this.ctx.request.body as {
            name: string;
            description: string;
            location: string;
            price: string;
            maxParticipants: number;
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
    async searchActivity(@Query('keyword') keyword: string) {
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
import { Controller, Post, Inject, Get, Del, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { GymService } from '../service/gyms.service';

@Controller('/gyms')
export class GymsController { 

    @Inject()
    ctx : Context;
    @Inject()
    gymService: GymService;


    @Post('/create')
    async createGym() {
        const data = this.ctx.request.body as {
            name: string;
            description: string;
            location: string;
            price: string;
            image: string;
            rating: number;
        };
        await this.gymService.createGym(data.name, data.description, data.location, data.price, data.image, data.rating);
        return { success: true, message: 'OK', data: null };
    }

    @Post('/update')
    async updateGym() {
        // This method will be implemented later
        return { success: true, message: 'Gym update not implemented yet', data: null };
    }

    @Del('/del')
    async delGym(@Query('gid') gid: number) {
        if(!gid) {
            return { success: false, message: 'Gym ID is required', data: null };
        }
        const result = await this.gymService.delGym(gid);
        if(result.affected === 0) 
            return { success: false, message: 'Gym not found or already deleted', data: null};
        return { success: true, message: 'Gym '+gid+' is deleted', data: null };
    }

    @Get('/info')
    async searchGym(@Query('keyword') keyword: string) {
        if(keyword === null || keyword === '' || keyword === undefined) {
            this.ctx.logger.info('No keyword provided, retrieving all gyms');
            const data = await this.gymService.getGymInfo(null);
            return { success: true, message: 'All gyms retrieved', data: data };
        }
        const data = await this.gymService.searchGym(keyword);
        this.ctx.logger.info(`Search gyms with keyword: ${keyword}`);
        if(data.length === 0) 
            return { success: false, message: 'No results found', data: null};
        return { success: true, message: 'Search results for keyword: '+keyword, data: data}
    }
}
import { Controller, Get } from '@nestjs/common';
import { WildberriesService } from './wildberries.service';

@Controller('wildberries')
export class WildberriesController {
    constructor(private readonly wildberriesService: WildberriesService) {}

    @Get()
    public getStatistics() {
        return this.wildberriesService.getStatistics();
    }
}

import { Module } from '@nestjs/common';

import { WildberriesService } from './wildberries.service';
import { WildberriesController } from './wildberries.controller';

import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { GoogleSheetsModule } from '@/modules/google-sheets/google-sheets.module';

@Module({
    imports: [StatisticsModule, GoogleSheetsModule],
    controllers: [WildberriesController],
    providers: [WildberriesService]
})
export class WildberriesModule {}

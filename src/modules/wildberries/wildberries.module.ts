import { Module } from '@nestjs/common';

import { WildberriesService } from './wildberries.service';

import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { GoogleSheetsModule } from '@/modules/google-sheets/google-sheets.module';

@Module({
    imports: [StatisticsModule, GoogleSheetsModule],
    controllers: [],
    providers: [WildberriesService]
})
export class WildberriesModule {}

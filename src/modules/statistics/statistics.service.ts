import { Injectable, Logger } from '@nestjs/common';

import { InjectConnection } from 'nestjs-knex';
import { Knex } from 'knex';
import { getDate } from '@/utils/get-date';

@Injectable()
export class StatisticsService {
    private logger = new Logger(StatisticsService.name);

    public constructor(
        @((InjectConnection as any)()) private readonly knex: Knex
    ) {}

    public async saveToDatabase(data: any) {
        try {
            const list = data.warehouseList;

            for (let i = 0; i < list.length; i++) {
                const data = list[i];
                const date = getDate();

                await this.knex('statistics')
                    .insert({ ...data, date })
                    .onConflict(['date', 'warehouseName'])
                    .merge();
            }
        } catch (error: unknown) {
            this.logger.error(error);
        }
    }
}

import {
    Injectable,
    InternalServerErrorException,
    Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios, { type AxiosInstance } from 'axios';

import { StatisticsService } from '@/modules/statistics/statistics.service';
import { GoogleSheetsService } from '@/modules/google-sheets/google-sheets.service';

import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule';

import { getDate } from '@/utils/get-date';

@Injectable()
export class WildberriesService {
    private logger = new Logger(WildberriesService.name);

    private readonly httpClient: AxiosInstance = axios.create({
        baseURL: this.configService.getOrThrow('WILDBERRIES_ENDPOINT'),
        headers: {
            Authorization: `Bearer ${this.configService.getOrThrow('WILDBERRIES_TOKEN')}`
        }
    });

    public constructor(
        private readonly statisticsService: StatisticsService,
        private readonly googleSheetsService: GoogleSheetsService,
        private readonly configService: ConfigService
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    public async getStatistics(): Promise<void> {
        try {
            const response = await this.httpClient.get<any>('/tariffs/box', {
                params: {
                    date: getDate()
                }
            });

            const data = response.data.response.data;

            await this.statisticsService.saveToDatabase(data);
            await this.googleSheetsService.saveToSheets(data);
        } catch (error: unknown) {
            this.logger.error(error);
            throw new InternalServerErrorException('Could not get statistics.');
        }
    }
}

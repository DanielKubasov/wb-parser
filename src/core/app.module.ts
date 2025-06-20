import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { KnexModule } from 'nestjs-knex';

import { WildberriesModule } from '@/modules/wildberries/wildberries.module';
import { GoogleSheetsModule } from '@/modules/google-sheets/google-sheets.module';

import { GoogleModule } from './google/google.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        KnexModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (c: ConfigService) => ({
                config: {
                    client: 'pg',
                    connection: {
                        host: c.getOrThrow<string>('POSTGRES_HOST'),
                        port: Number(c.getOrThrow<string>('POSTGRES_PORT')),
                        user: c.getOrThrow<string>('POSTGRES_USER'),
                        password: c.getOrThrow<string>('POSTGRES_PASSWORD'),
                        database: c.getOrThrow<string>('POSTGRES_DB')
                    }
                }
            }),
            inject: [ConfigService]
        }),
        ScheduleModule.forRoot(),
        WildberriesModule,
        GoogleSheetsModule,
        GoogleModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

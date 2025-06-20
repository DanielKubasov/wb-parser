import { Module } from '@nestjs/common';

import { GoogleSheetsService } from './google-sheets.service';

import { GoogleModule } from '@/core/google/google.module';

@Module({
    imports: [GoogleModule],
    controllers: [],
    providers: [GoogleSheetsService],
    exports: [GoogleSheetsService]
})
export class GoogleSheetsModule {}

import { GoogleService } from '@/core/google/google.service';
import { getDate } from '@/utils/get-date';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetsService {
    private logger = new Logger(GoogleSheetsService.name);

    public constructor(
        private readonly googleService: GoogleService,
        private readonly configService: ConfigService
    ) {}

    public async saveToSheets(data: any) {
        try {
            const sheets = this.googleService.getSheetsClient();

            const sheetId =
                this.configService.getOrThrow<string>('GOOGLE_SHEET_ID');

            const values = data.warehouseList.map(v => {
                const res: string[] = [];

                for (const val of Object.values(v)) {
                    res.push(String(val));
                }

                res.push(getDate())

                return res;
            });

            const resource = [
                [
                    'boxDeliveryAndStorageExpr',
                    'boxDeliveryBase',
                    'boxDeliveryLiter',
                    'boxStorageBase',
                    'boxStorageLiter',
                    'warehouseName',
                    'date'
                ],
                ...values
            ];

            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `A:G`,
                valueInputOption: 'RAW',
                requestBody: { values: resource }
            });
        } catch (error: unknown) {
            this.logger.error(error);
        }
    }
}

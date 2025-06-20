import { GoogleService } from '@/core/google/google.service';
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

            const sheetName = 'Wildberries information';

            const values = data.warehouseList.map(v => {
                const res: string[] = [];

                for (const val of Object.values(v)) {
                    res.push(String(val));
                }

                return res;
            });

            const resource = [
                [
                    'boxDeliveryAndStorageExpr',
                    'boxDeliveryBase',
                    'boxDeliveryLiter',
                    'boxStorageBase',
                    'boxStorageLiter',
                    'warehouseName'
                ],
                ...values
            ];

            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `A:F`,
                valueInputOption: 'RAW',
                requestBody: { values: resource }
            });
        } catch (error: unknown) {
            this.logger.error(error);
        }
    }
}

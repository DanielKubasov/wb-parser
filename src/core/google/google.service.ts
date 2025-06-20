import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthClient, GoogleAuth } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleService {
    private authClient: GoogleAuth<AuthClient> = new google.auth.GoogleAuth({
        keyFile: this.configService.getOrThrow('GOOGLE_SECRETS_PATH'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    public sheetsClient: sheets_v4.Sheets;

    public constructor(private readonly configService: ConfigService) {}

    public getSheetsClient(): sheets_v4.Sheets {
        if (this.sheetsClient) return this.sheetsClient;

        const sheets = google.sheets({ version: 'v4', auth: this.authClient });

        this.sheetsClient = sheets;

        return this.sheetsClient;
    }
}

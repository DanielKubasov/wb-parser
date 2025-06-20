// knexfile.ts
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export default {
    development: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        },
        migrations: {
            directory: './migrations',
            extension: 'ts'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        },
        migrations: {
            directory: './migrations',
            extension: 'ts'
        }
    }
};

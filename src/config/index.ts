import { config } from 'dotenv';
config({ path: '.env' });

export const { PORT } = process.env;

export const { TELEGRAM_BOT_TOKEN } = process.env;

export const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

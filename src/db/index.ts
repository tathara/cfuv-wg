import { DataSource } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../config';

export const dbConnectionOptions: DataSource = new DataSource({
  type: 'postgres',

  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  entities: ['dist/db/entities/*{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',

  migrationsRun: false,
  synchronize: false,
});

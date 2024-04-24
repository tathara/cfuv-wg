import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectionOptions } from './db';

@Module({
  imports: [TypeOrmModule.forRoot(dbConnectionOptions), BotModule],
})
export class AppModule {}

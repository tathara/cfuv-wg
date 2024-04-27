import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { KeyModule } from './key/key.module';
import { dbConnectionOptions } from './db';

@Module({
  imports: [TypeOrmModule.forRoot(dbConnectionOptions), BotModule, UserModule, KeyModule],
})
export class AppModule {}

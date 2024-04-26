import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { KeyModule } from './key/key.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BotModule, UserModule, KeyModule],
})
export class AppModule {}

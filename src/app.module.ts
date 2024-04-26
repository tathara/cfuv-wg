import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BotModule, UserModule],
})
export class AppModule {}

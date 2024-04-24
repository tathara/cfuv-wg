import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Key } from 'src/db/entities/key.entity';

@Module({
  providers: [BotService],
  imports: [TypeOrmModule.forFeature([User, Key])],
  exports: [BotService],
})
export class BotModule {}

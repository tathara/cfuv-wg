import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Key } from 'src/db/entities/key.entity';
import { UserModule } from 'src/user/user.module';
import { KeyModule } from 'src/key/key.module';

@Module({
  providers: [BotService],
  imports: [TypeOrmModule.forFeature([User, Key]), UserModule, KeyModule],
  exports: [BotService],
})
export class BotModule {}

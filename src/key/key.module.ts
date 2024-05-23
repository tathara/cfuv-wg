import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { Key } from '../db/entities/key.entity';
import { KeyController } from './key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [KeyService],
  controllers: [KeyController],
  imports: [TypeOrmModule.forFeature([Key])],
  exports: [KeyService],
})
export class KeyModule {}

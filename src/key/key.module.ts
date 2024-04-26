import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { Key } from 'src/db/entities/key.entity';

@Module({
  providers: [KeyService],
  imports: [Key],
  exports: [KeyService],
})
export class KeyModule {}

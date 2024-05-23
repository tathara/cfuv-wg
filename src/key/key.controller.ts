import { Controller, Get, Param } from '@nestjs/common';
import { KeyService } from './key.service';
import { Key } from '../db/entities/key.entity';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Get()
  async getKeys(): Promise<Key[]> {
    return this.keyService.getKeys();
  }

  @Get(':name')
  async getKey(@Param('name') name: string): Promise<Key> {
    return this.keyService.getKey(name);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from '../db/entities/key.entity';
import { User } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeyService {
  constructor(@InjectRepository(Key) private readonly keyRepo: Repository<Key>) {}

  public async createKeyForUser(user: User): Promise<Key> {
    try {
      const createdKey = await this.keyRepo.save({ user });

      return {
        id: 1,
        name: 'wg1',
        path: '/path/to/keys/wg1.conf',
        user: { id: 1, chatId: 12345, keys: [] },
      };
    } catch (error) {
      console.error(error);
    }
  }

  public async getKeys(): Promise<Key[]> {
    try {
      return this.keyRepo.find();
    } catch (error) {
      console.error(error);
    }
  }

  public async getKey(name: string): Promise<Key> {
    try {
      return this.keyRepo.findOne({
        where: {
          name,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteUsersKey(user: User, name: string): Promise<string> {
    try {
      const isUserKey = user.keys.find((key) => key.name === name);

      if (!isUserKey) throw new NotFoundException('User has no key with requested name');

      return name;
    } catch (error) {
      console.error(error);
    }
  }
}

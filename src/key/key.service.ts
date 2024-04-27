import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { Key } from 'src/db/entities/key.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';

@Injectable()
export class KeyService {
  constructor(@InjectRepository(Key) private readonly keyRepo: Repository<Key>) {}

  public async createKeyForUser(user: User): Promise<Key> {
    try {
      const createdKey = await this.keyRepo.save({ user });

      const execAsync = promisify(exec);
      const { stdout, stderr } = await execAsync(`pivpn add -n ${createdKey.name}`);

      if (stdout) return createdKey;
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

      const execAsync = promisify(exec);
      const { stdout, stderr } = await execAsync(`pivpn remove ${name}`);

      if (!stdout) return;

      await this.keyRepo.delete(name);

      return name;
    } catch (error) {
      console.error(error);
    }
  }
}

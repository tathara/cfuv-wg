import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { Key } from 'src/db/entities/key.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';

@Injectable()
export class KeyService {
  constructor(@InjectRepository(Key) private readonly keyRepo: Repository<Key>) {}

  public async createKey(user: User): Promise<Key> {
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

  public async getKey(id: number): Promise<Key> {
    try {
      return this.keyRepo.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteKey(name: string): Promise<string> {
    try {
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from '../db/entities/key.entity';
import { User } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async createUser(chatId: number): Promise<User> {
    try {
      return this.userRepo.save({ chatId });
    } catch (error) {
      console.error(error);
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser(chatId: number): Promise<User> {
    try {
      return this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.keys', 'keys')
        .where('chatId.id = :chatId', { chatId })
        .getOne();
    } catch (error) {
      console.error(error);
    }
  }

  public async getUserKeys(chatId: number): Promise<Key[]> {
    try {
      const foundUser = await this.getUser(chatId);

      return foundUser.keys;
    } catch (error) {
      console.error(error);
    }
  }
}

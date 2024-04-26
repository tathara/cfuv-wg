import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
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

  public async getUser(chatId: number): Promise<User> {
    try {
      return await this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.keys', 'keys')
        .where('chatId.id = :chatId', { chatId })
        .getOne();
    } catch (error) {
      console.error(error);
    }
  }
}

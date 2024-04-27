import { Controller, Get, Post, Param, Body, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/entities/user.entity';
import { KeyService } from 'src/key/key.service';
import { Key } from 'src/db/entities/key.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly keyService: KeyService,
  ) {}

  @Post()
  async createUser(@Body() chatId: number): Promise<User> {
    return this.userService.createUser(chatId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':chatId')
  async getUser(@Param('chatId') chatId: number): Promise<User> {
    return this.userService.getUser(chatId);
  }

  @Post(':chatId/keys')
  async createKeyForUser(@Param('chatId') chatId: number): Promise<Key> {
    const user = await this.userService.getUser(chatId);

    if (!user) throw new NotFoundException('There is no user with requested chat id');

    return this.keyService.createKeyForUser(user);
  }

  @Get(':chatId/keys')
  async getUserKeys(@Param('chatId') chatId: number): Promise<Key[]> {
    return this.userService.getUserKeys(chatId);
  }

  @Delete(':chatId/keys/:name')
  async deleteUsersKey(
    @Param('chatId') chatId: number,
    @Param('name') name: string,
  ): Promise<string> {
    const user = await this.userService.getUser(chatId);

    if (!user) throw new NotFoundException('There is no user with requested chat id');

    return this.keyService.deleteUsersKey(user, name);
  }
}

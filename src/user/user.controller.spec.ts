import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KeyService } from 'src/key/key.service';
import { User } from '../db/entities/user.entity';
import { Key } from '../db/entities/key.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let keyService: KeyService;

  const mockUser: User = {
    id: 1,
    chatId: 12345,
    keys: [],
  };

  const mockKey: Key = {
    id: 1,
    name: 'wg1',
    path: '/path/to/keys/wg1.conf',
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUsers: jest.fn().mockResolvedValue([mockUser]),
            getUser: jest.fn().mockResolvedValue(mockUser),
            getUserKeys: jest.fn().mockResolvedValue([mockKey]),
          },
        },
        {
          provide: KeyService,
          useValue: {
            createKeyForUser: jest.fn().mockResolvedValue(mockKey),
            deleteUsersKey: jest.fn().mockResolvedValue('Key deleted'),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    keyService = module.get<KeyService>(KeyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const result = await controller.createUser(mockUser.chatId);
      expect(result).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith(mockUser.chatId);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = await controller.getUsers();
      expect(result).toEqual([mockUser]);
      expect(userService.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await controller.getUser(mockUser.chatId);
      expect(result).toEqual(mockUser);
      expect(userService.getUser).toHaveBeenCalledWith(mockUser.chatId);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(null);

      await expect(controller.getUser(mockUser.chatId)).rejects.toThrowError(
        new NotFoundException('There is no user with requested chat id'),
      );
    });
  });

  describe('createKeyForUser', () => {
    it('should create a key for a user', async () => {
      const result = await controller.createKeyForUser(mockUser.chatId);
      expect(result.name).toMatch(/wg\d+/);
      expect(result.path).toMatch(/\/path\/to\/keys\/wg\d+\.conf/);
      expect(userService.getUser).toHaveBeenCalledWith(mockUser.chatId);
      expect(keyService.createKeyForUser).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(null);

      await expect(controller.createKeyForUser(mockUser.chatId)).rejects.toThrowError(
        new NotFoundException('There is no user with requested chat id'),
      );
    });
  });

  describe('getUserKeys', () => {
    it('should return keys of the user', async () => {
      const keys = await controller.getUserKeys(mockUser.chatId);
      expect(userService.getUserKeys).toHaveBeenCalledWith(mockUser.chatId);
      expect(keys).toEqual([mockKey]);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest
        .spyOn(userService, 'getUserKeys')
        .mockRejectedValueOnce(new NotFoundException('There is no user with requested chat id'));
      await expect(controller.getUserKeys(mockUser.chatId)).rejects.toThrowError(
        new NotFoundException('There is no user with requested chat id'),
      );
    });
  });

  describe('deleteUsersKey', () => {
    it('should delete user key', async () => {
      const response = await controller.deleteUsersKey(mockUser.chatId, mockKey.name);
      expect(userService.getUser).toHaveBeenCalledWith(mockUser.chatId);
      expect(keyService.deleteUsersKey).toHaveBeenCalledWith(mockUser, mockKey.name);
      expect(response).toEqual('Key deleted');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(null);

      await expect(controller.deleteUsersKey(mockUser.chatId, mockKey.name)).rejects.toThrowError(
        new NotFoundException('There is no user with requested chat id'),
      );
    });
  });
});

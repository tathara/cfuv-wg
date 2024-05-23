import { Test, TestingModule } from '@nestjs/testing';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { Key } from '../db/entities/key.entity';

describe('KeyController', () => {
  let controller: KeyController;
  let service: KeyService;

  const mockKey: Key = {
    id: 1,
    name: 'wg1',
    path: '/path/to/keys/wg1.conf',
    user: { id: 1, chatId: 12345, keys: [] },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyController],
      providers: [
        {
          provide: KeyService,
          useValue: {
            getKeys: jest.fn().mockResolvedValue([mockKey]),
            getKey: jest.fn().mockResolvedValue(mockKey),
          },
        },
      ],
    }).compile();

    controller = module.get<KeyController>(KeyController);
    service = module.get<KeyService>(KeyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getKeys', () => {
    it('should return an array of keys', async () => {
      const result = await controller.getKeys();
      expect(result).toEqual([mockKey]);
      expect(service.getKeys).toHaveBeenCalled();
    });
  });

  describe('getKey', () => {
    it('should return a key', async () => {
      const result = await controller.getKey(mockKey.name);
      expect(result).toEqual(mockKey);
      expect(service.getKey).toHaveBeenCalledWith(mockKey.name);
    });
  });
});

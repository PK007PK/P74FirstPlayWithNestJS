import { Test, TestingModule } from '@nestjs/testing';
import { FoxController } from './fox.controller';

describe('FoxController', () => {
  let controller: FoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoxController],
    }).compile();

    controller = module.get<FoxController>(FoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

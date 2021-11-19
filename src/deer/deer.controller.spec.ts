import { Test, TestingModule } from '@nestjs/testing';
import { DeerController } from './deer.controller';

describe('DeerController', () => {
  let controller: DeerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeerController],
    }).compile();

    controller = module.get<DeerController>(DeerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

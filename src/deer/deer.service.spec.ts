import { Test, TestingModule } from '@nestjs/testing';
import { DeerService } from './deer.service';

describe('DeerService', () => {
  let service: DeerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeerService],
    }).compile();

    service = module.get<DeerService>(DeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

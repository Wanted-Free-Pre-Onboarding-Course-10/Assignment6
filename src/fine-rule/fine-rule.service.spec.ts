import { Test, TestingModule } from '@nestjs/testing';
import { FineRuleService } from './fine-rule.service';

describe('FineRuleService', () => {
  let service: FineRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FineRuleService],
    }).compile();

    service = module.get<FineRuleService>(FineRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

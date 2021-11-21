import { Test, TestingModule } from '@nestjs/testing';
import { ErrorRuleService } from './error-rule.service';

describe('ErrorRuleService', () => {
  let service: ErrorRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorRuleService],
    }).compile();

    service = module.get<ErrorRuleService>(ErrorRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

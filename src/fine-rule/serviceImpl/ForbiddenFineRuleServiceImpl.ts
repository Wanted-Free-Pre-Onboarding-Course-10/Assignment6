import { FineRuleService } from '../fine-rule.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ForbiddenFineRuleServiceImpl implements FineRuleService {
  applyFine() {}
}

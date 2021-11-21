import { Module } from '@nestjs/common';
import { ErrorRuleService } from './error-rule.service';

@Module({
  providers: [ErrorRuleService]
})
export class ErrorRuleModule {}

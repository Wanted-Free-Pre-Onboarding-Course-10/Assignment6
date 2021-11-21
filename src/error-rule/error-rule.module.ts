import { Module } from '@nestjs/common';
import { ErrorRuleService } from './error-rule.service';
import { ErrorRuleServiceImpl } from './serviceImpl/ErrorRuleServiceImpl';

@Module({
  providers: [
    {
      provide: 'ErrorRuleService', useClass: ErrorRuleServiceImpl,
    }]
})
export class ErrorRuleModule { }

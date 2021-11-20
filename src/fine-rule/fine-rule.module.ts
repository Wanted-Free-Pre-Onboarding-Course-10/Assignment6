import { Module } from '@nestjs/common';
import { FineRuleService } from './fine-rule.service';
import { ForbiddenFineRuleServiceImpl } from './serviceImpl/ForbiddenFineRuleServiceImpl';

@Module({
  providers: [
    {
      provide: 'FineRuleService',
      useClass: ForbiddenFineRuleServiceImpl,
    },
  ],
})
export class FineRuleModule {}
